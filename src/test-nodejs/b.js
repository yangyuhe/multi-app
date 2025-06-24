const http = require("http");
const { stdout } = require("process");
const fs = require("fs");
const { Transform } = require("stream");
const req = http.request(
  {
    host: "127.0.0.1",
    path: "/api/generate",
    port: 11434,
    method: "POST",
  },
  (res) => {
    const t = new ResponseTransform();
    res.pipe(t).pipe(stdout);
  }
);

class ResponseTransform extends Transform {
  _transform(chunk, encoding, callback) {
    // 将输入的 chunk 转换为大写
    const transformedChunk = chunk.toString();
    const data = JSON.parse(transformedChunk).response;
    this.push(data);
    // 调用回调函数表示处理完成
    callback();
  }
}

const options = {
  model: "llama3.2:1b",
  raw: true,
  keep_alive: 1800,
  options: {
    temperature: null,
    top_p: null,
    top_k: null,
    num_predict: 1024,
    stop: null,
    num_ctx: 2048,
  },
  prompt:
    '<|start_header_id|>user<|end_header_id|>\n```javascript\nclass Calculator {\n  constructor() {\n    this.result = 0;\n  }\n\n  add(number) {\n    this.result += number;\n    return this;\n  }\n\n  subtract(number) {\n    this.result -= number;\n    return this;\n  }\n\n  multiply(number) {\n    this.result *= number;\n    return this;\n  }\n\n  divide(number) {\n    if (number === 0) {\n      throw new Error("Cannot divide by zero2225688");\n    }\n    this.result /= number;\n    return this;\n  }\n\n  getResult() {\n    return this.result;\n  }\n\n<START EDITING HERE>\n  reset() {\n    this.result = 0;\n    return this;\n  }\n<STOP EDITING HERE>\n```\n\nPlease rewrite the entire code block above, editing the portion below "<START EDITING HERE>" in order to satisfy the following request: "Write comments for this code. Do not change anything about the code itself.". You should rewrite the entire code block without leaving placeholders, even if the code is the same as before. When you get to "<STOP EDITING HERE>", end your response.\n<|eot_id|><|start_header_id|>assistant<|end_header_id|>\nSure! Here\'s the entire code block, including the rewritten portion:\n```javascript\nclass Calculator {\n  constructor() {\n    this.result = 0;\n  }\n\n  add(number) {\n    this.result += number;\n    return this;\n  }\n\n  subtract(number) {\n    this.result -= number;\n    return this;\n  }\n\n  multiply(number) {\n    this.result *= number;\n    return this;\n  }\n\n  divide(number) {\n    if (number === 0) {\n      throw new Error("Cannot divide by zero2225688");\n    }\n    this.result /= number;\n    return this;\n  }\n\n  getResult() {\n    return this.result;\n  }\n\n<START EDITING HERE>\n',
};

const options2 = {
  model: "qwen2.5:0.5b",
  raw: true,
  keep_alive: 1800,
  options: {
    temperature: null,
    top_p: null,
    top_k: null,
    num_predict: 100,
    stop: ["20"],
    num_ctx: 777748,
  },
  prompt: "用中文讲个故事",
};
req.write(JSON.stringify(options));
req.end();
