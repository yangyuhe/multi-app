import React, { useCallback, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Handle,
  Position,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useHandleConnections,
  useNodesData,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./style.css";
import "./index.css";

const defaultNodes = [
  {
    id: "a",
    type: "input",
    data: { label: "Node A" },
    position: { x: 250, y: 25 },
  },

  {
    id: "b",
    data: { label: "Node B" },
    position: { x: 100, y: 125 },
  },
  {
    id: "c",
    type: "output",
    data: { label: "Node C" },
    position: { x: 250, y: 250 },
  },
];

const defaultEdges = [{ id: "ea-b", source: "a", target: "b" }];

const edgeOptions = {
  animated: true,
  style: {
    stroke: "white",
  },
};

const connectionLineStyle = { stroke: "white" };
let nodeId = 0;

function App() {
  const reactFlowInstance = useReactFlow();
  const onClick = useCallback(() => {
    const id = `${++nodeId}`;
    const newNode = {
      id,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      data: {
        label: `Node ${id}`,
      },
    };
    reactFlowInstance.addNodes(newNode);
  }, []);
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        defaultNodes={defaultNodes}
        defaultEdges={defaultEdges}
        defaultEdgeOptions={edgeOptions}
        fitView
        style={{
          backgroundColor: "#D3D2E5",
        }}
        onNodesChange={(changes) => {
          console.log(changes);
        }}
        connectionLineStyle={connectionLineStyle}
      />
      <button
        onClick={onClick}
        className="bg-white absolute top-[10px] left-[10px]"
      >
        add node
      </button>
    </div>
  );
}

const rootDom = document.getElementById("app");
const root = createRoot(rootDom);
root.render(
  <ReactFlowProvider>
    <App />
  </ReactFlowProvider>
);
