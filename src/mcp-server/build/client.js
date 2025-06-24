"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_1 = require("@anthropic-ai/sdk");
const index_js_1 = require("@modelcontextprotocol/sdk/client/index.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/client/stdio.js");
const promises_1 = __importDefault(require("readline/promises"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // load environment variables from .env
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
// if (!ANTHROPIC_API_KEY) {
//     throw new Error("ANTHROPIC_API_KEY is not set");
// }
class MCPClient {
  mcp;
  anthropic;
  transport = null;
  tools = [];
  constructor() {
    // Initialize Anthropic client and MCP client
    this.anthropic = new sdk_1.Anthropic({
      apiKey: ANTHROPIC_API_KEY,
    });
    this.mcp = new index_js_1.Client({
      name: "mcp-client-cli",
      version: "1.0.0",
    });
  }
  async connectToServer(serverScriptPath) {
    /**
     * Connect to an MCP server
     *
     * @param serverScriptPath - Path to the server script (.py or .js)
     */
    try {
      // Determine script type and appropriate command
      const isJs = serverScriptPath.endsWith(".js");
      const isPy = serverScriptPath.endsWith(".py");
      if (!isJs && !isPy) {
        throw new Error("Server script must be a .js or .py file");
      }
      const command = isPy
        ? process.platform === "win32"
          ? "python"
          : "python3"
        : process.execPath;
      // Initialize transport and connect to server
      this.transport = new stdio_js_1.StdioClientTransport({
        command,
        args: [serverScriptPath],
      });
      this.mcp.connect(this.transport);
      // List available tools
      const toolsResult = await this.mcp.listTools();
      this.tools = toolsResult.tools.map((tool) => {
        return {
          name: tool.name,
          description: tool.description,
          input_schema: tool.inputSchema,
        };
      });
      console.log(
        "Connected to server with tools:",
        this.tools.map(({ name }) => name)
      );
    } catch (e) {
      console.log("Failed to connect to MCP server: ", e);
      throw e;
    }
  }
  async processQuery(query) {
    /**
     * Process a query using Claude and available tools
     *
     * @param query - The user's input query
     * @returns Processed response as a string
     */
    const messages = [
      {
        role: "user",
        content: query,
      },
    ];
    // Initial Claude API call
    const response = await this.anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1000,
      messages,
      tools: this.tools,
    });
    // Process response and handle tool calls
    const finalText = [];
    const toolResults = [];
    for (const content of response.content) {
      if (content.type === "text") {
        finalText.push(content.text);
      } else if (content.type === "tool_use") {
        // Execute tool call
        const toolName = content.name;
        const toolArgs = content.input;
        const result = await this.mcp.callTool({
          name: toolName,
          arguments: toolArgs,
        });
        toolResults.push(result);
        finalText.push(
          `[Calling tool ${toolName} with args ${JSON.stringify(toolArgs)}]`
        );
        // Continue conversation with tool results
        messages.push({
          role: "user",
          content: result.content,
        });
        // Get next response from Claude
        const response = await this.anthropic.messages.create({
          model: "claude-3-5-sonnet-20241022",
          max_tokens: 1000,
          messages,
        });
        finalText.push(
          response.content[0].type === "text" ? response.content[0].text : ""
        );
      }
    }
    return finalText.join("\n");
  }
  async chatLoop() {
    /**
     * Run an interactive chat loop
     */
    const rl = promises_1.default.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    try {
      console.log("\nMCP Client Started!");
      console.log("Type your queries or 'quit' to exit.");
      while (true) {
        const message = await rl.question("\nQuery: ");
        if (message.toLowerCase() === "quit") {
          break;
        }
        const response = await this.processQuery(message);
        console.log("\n" + response);
      }
    } finally {
      rl.close();
    }
  }
  async cleanup() {
    /**
     * Clean up resources
     */
    await this.mcp.close();
  }
}
async function main() {
  if (process.argv.length < 3) {
    console.log("Usage: node build/index.js <path_to_server_script>");
    return;
  }
  const mcpClient = new MCPClient();
  try {
    await mcpClient.connectToServer(process.argv[2]);
    await mcpClient.chatLoop();
  } finally {
    await mcpClient.cleanup();
    process.exit(0);
  }
}
main();
