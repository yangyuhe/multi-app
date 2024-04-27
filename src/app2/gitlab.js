import G6 from "@antv/g6";

/**
 * The usage of built-in polyline
 * by Shiwu
 */
const nodes = [
  {
    id: "0",
    x: 150,
    y: 100
  },
  {
    id: "1",
    x: 350,
    y: 300
  },
  {
    id: "obstacle1",
    label: "obstacle1",
    x: 190,
    y: 100
  },
  {
    id: "obstacle2",
    label: "obstacle2",
    x: 300,
    y: 300
  }
];
const data = {
  nodes,
  edges: [
    // Built-in polyline
    {
      source: "0",
      target: "1",
      // routeCfg: {
      //   obstacles: [nodes[2], nodes[3]]
      // }
    }
  ]
};

const width = document.getElementById("app").scrollWidth;
const height = document.getElementById("app").scrollHeight || 500;
const graph = new G6.Graph({
  container: "app",
  width,
  height,
  // translate the graph to align the canvas's center, support by v3.5.1
  fitCenter: true,
  // make the edge link to the centers of the end nodes
  linkCenter: true,
  modes: {
    // behavior
    default: ["drag-node"]
  },
  defaultEdge: {
    type: "line"
  }
});

graph.data(data);
graph.render();

G6.registerEdge(
  "custom-poly",
  {
    options: {
      style: {
        offset: 1
      },
      routeCfg: {
        obstacles: [graph.getNodes()[2], graph.getNodes()[3]], // 希望边绕过的障碍节点
        maxAllowedDirectionChange: 90, // 允许的最大转角
        maximumLoops: 500,
        simple: false,
        gridSize: 1 // 指定精度
      }
    }
  },
  "polyline"
);

graph.on("canvas:click", (evt) => {
  console.log("click");
  graph.updateItem(graph.getEdges()[0], {
    type: "custom-poly",
    routeCfg: {
      obstacles: [graph.getNodes()[2], graph.getNodes()[3]], // 希望边绕过的障碍节点
      // maxAllowedDirectionChange: 90, // 允许的最大转角
      // maximumLoops: 500,
      simple: false
      // gridSize: 10 // 指定精度
    }
  });
  console.log("graph", graph.getEdges()[0]);
});
