import mermaid from "mermaid";

// 初始化mermaid
mermaid.initialize({ startOnLoad: false });

// 定义一个Mermaid流程图文本
const mermaidText = `
graph LR
    A --> B
    B --> C
`;

// 解析Mermaid文本
mermaid.mermaidAPI.parse(mermaidText);

// 获取解析后的图表定义
const graphDefinition = mermaid.mermaidAPI.getGraphDefinition();

// 构建JavaScript结构
const jsStructure = {
  nodes: [],
  edges: [],
};

// 提取节点和边信息
graphDefinition.forEach((item) => {
  if (item.type === "node") {
    jsStructure.nodes.push(item.id);
  } else if (item.type === "edge") {
    jsStructure.edges.push({
      from: item.from,
      to: item.to,
    });
  }
});

// 输出JavaScript结构
console.log(jsStructure);
