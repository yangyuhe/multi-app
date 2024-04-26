import { createRoot } from "react-dom/client";
import * as React from "react";

import G6 from "@antv/g6";

function App() {
  React.useEffect(() => {
    const graph = new G6.Graph({
      container: "mountNode", // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
      width: 800, // Number，必须，图的宽度
      height: 500, // Number，必须，图的高度
      layout: {
        // Object，可选，布局的方法及其配置项，默认为 random 布局。
        type: "grid", // 指定为力导向布局
        preventOverlap: true, // 防止节点重叠
        // nodeSize: 30        // 节点大小，用于算法中防止节点重叠时的碰撞检测。由于已经在上一节的元素配置中设置了每个节点的 size 属性，则不需要在此设置 nodeSize。
        rows: 2,
        cols: 4,
        sortBy: "sort",
        nodeSize: 50,
      },
    });

    const data = {
      // 点集
      nodes: [
        {
          id: "node1", // String，该节点存在则必须，节点的唯一标识
          type: "rect",
          label: "node1",
          sort: 8,
          size: [10, 30],
        },
        {
          id: "node2", // String，该节点存在则必须，节点的唯一标识
          label: "node2",
          sort: 7,
          size: 50,
        },
        {
          id: "node3", // String，该节点存在则必须，节点的唯一标识
          label: "node3",
          sort: 6,
        },
        {
          id: "node4", // String，该节点存在则必须，节点的唯一标识
          label: "node4",
          sort: 5,
        },
        {
          id: "node5", // String，该节点存在则必须，节点的唯一标识
          label: "node5",
          sort: 4,
        },
        {
          id: "node6", // String，该节点存在则必须，节点的唯一标识
          label: "node6",
          sort: 3,
        },
        {
          id: "node7", // String，该节点存在则必须，节点的唯一标识
          label: "node7",
          sort: 2,
        },
        {
          id: "node8", // String，该节点存在则必须，节点的唯一标识
          label: "node8",
          sort: 1,
        },
      ],
      // 边集
      edges: [
        {
          source: "node1", // String，必须，起始点 id
          target: "node8", // String，必须，目标点 id
          type: "polyline",
        },
        {
          source: "node1", // String，必须，起始点 id
          target: "node4", // String，必须，目标点 id
          type: "polyline",
          id: "edge2",
        },
      ],
    };

    graph.data(data); // 读取 Step 2 中的数据源到图上
    graph.render(); // 渲染图
    console.log(graph.findById("node2"));
    setTimeout(() => {
      graph.updateItem("edge2", {
        source: "node1", // String，必须，起始点 id
        target: "node4", // String，必须，目标点 id
        type: "polyline",
        routeCfg: {
          gridSize: 10, // 指定精度
          maxAllowedDirectionChange: Math.PI, // 允许的最大转角，弧度制
          obstacles: [graph.findById("node2"), graph.findById("node3")],
        },
        style: {
          offset: 20, // 拐弯处距离节点最小距离
          radius: 10, // 拐弯处的圆角弧度，若不设置则为直角
          lineWidth: 2,
          stroke: "blue",
        },
        color: "red",
      });
    }, 1000);
  }, []);
  return (
    <>
      <div id="mountNode"></div>
    </>
  );
}

const rootDom = document.getElementById("app");
const root = createRoot(rootDom);
root.render(<App />);
