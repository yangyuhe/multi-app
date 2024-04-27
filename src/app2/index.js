import { createRoot } from "react-dom/client";
import * as React from "react";
import "./index.css"
import G6 from "@antv/g6";

function App() {
    React.useEffect(() => {
        const graph = new G6.Graph({
            container: "mountNode", // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
            width: 800, // Number，必须，图的宽度
            height: 500, // Number，必须，图的高度
            // linkCenter: true,
            // fitView: true,
            fitCenter: true
        });

        const data = {
            // 点集
            nodes: [
                {
                    id: "node1", // String，该节点存在则必须，节点的唯一标识
                    label: "node1",
                    x: 150,
                    y: 150,
                    size: [10, 30],
                    size: 50,
                    anchorPoints: [[0.5, 0], [1, 0.5], [0.5, 1], [0, 1]]
                },
                {
                    id: "node2", // String，该节点存在则必须，节点的唯一标识
                    label: "node2",
                    size: 50,
                    x: 300,
                    y: 150,
                },
                {
                    id: "node3", // String，该节点存在则必须，节点的唯一标识
                    label: "node3",
                    size: 50,
                    x: 450,
                    y: 150,
                },
                {
                    id: "node4", // String，该节点存在则必须，节点的唯一标识
                    label: "node4",
                    size: 50,
                    x: 600,
                    y: 150,
                },
                {
                    id: "node5", // String，该节点存在则必须，节点的唯一标识
                    label: "node5",
                    x: 150,
                    y: 350,
                },
                {
                    id: "node6", // String，该节点存在则必须，节点的唯一标识
                    label: "node6",
                    x: 300,
                    y: 350,
                },
                {
                    id: "node7", // String，该节点存在则必须，节点的唯一标识
                    label: "node7",
                    x: 450,
                    y: 350,
                },
                {
                    id: "node8", // String，该节点存在则必须，节点的唯一标识
                    label: "node8",
                    x: 600,
                    y: 350,
                },
            ],
            // 边集
            edges: [
                {
                    source: "node1", // String，必须，起始点 id
                    target: "node4", // String，必须，目标点 id
                    type: "polyline",
                    id: "edge1-4",
                    controlPoints: [{ x: 150, y: 100 }, { x: 600, y: 100 }],
                    style: {
                        endArrow: true,
                        startArrow: false
                    },
                    label: "edge1-4",
                    labelCfg: {
                        position: 'start'
                    }
                },
                {
                    source: "node4", // String，必须，起始点 id
                    target: "node1", // String，必须，目标点 id
                    type: "polyline",
                    id: "edge4-1",
                    controlPoints: [{ x: 600, y: 100 }, { x: 150, y: 100 }],
                    style: {
                        endArrow: true,
                        startArrow: false
                    },
                    label: "edge4-1",
                    labelCfg: {
                        position: 'start'
                    }
                },
            ],
        };

        graph.data(data); // 读取 Step 2 中的数据源到图上
        graph.render(); // 渲染图
        graph.on("canvas:click", (evt) => {

        })
    }, []);
    return (
        <>
            <div className="border-[red] border-[1px]" id="mountNode"></div>
        </>
    );
}

const rootDom = document.getElementById("app");
const root = createRoot(rootDom);
root.render(<App />);
