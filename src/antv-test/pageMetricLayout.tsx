import { Graph, Model, Options, Shape, ToolsView } from "@antv/x6";
import { createRoot } from "react-dom/client";
import "./index.css";
import * as React from "react";
import { GridLayout } from "@antv/layout";

function App() {
  React.useEffect(() => {
    const data = {
      nodes: [],
      edges: [],
    };

    let total = 5;

    for (let i = 0; i < total; i++) {
      data.nodes!.push({
        id: `${i}`,
        shape: "rect",
        label: "GPU" + i,
        width: 80,
        height: 80,
      });
    }

    for (let i = 0; i < total; i++) {
      for (let j = i + 1; j < total; j++) {
        data.edges!.push({
          source: "" + i,
          target: "" + j,
          attrs: {
            line: {
              stroke: "#10B981",
              strokeWidth: 1,
              sourceMarker: "block",
              targetMarker: "block",
            },
          },
          router: {
            name: "manhattan",
            args: {
              padding: 30,
            },
          },
        });
      }
    }

    const canvasHeight = 520;
    const canvasWidth = 1182;

    const graph = new Graph({
      container: document.getElementById("container")!,
      height: canvasHeight,
      width: canvasWidth,
    });

    const gridLayout = new GridLayout({
      type: "grid",
      width: canvasWidth,
      height: canvasHeight,
      rows: 4,
      cols: 4,
      onLayoutEnd() {},
    });

    const model = gridLayout.layout(data);
    console.log(model);

    graph.fromJSON(model);
    console.log(graph.getEdges(), graph.getNodes());
  }, []);
  return <div id="container"> </div>;
}

const rootDom = document.getElementById("app");
const root = createRoot(rootDom);
root.render(<App />);
