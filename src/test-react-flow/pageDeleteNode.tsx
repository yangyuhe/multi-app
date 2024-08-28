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
  useEdgesState,
  useHandleConnections,
  useNodesData,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./style.css";

const initialNodes = [
  { id: "1", data: { label: "Node 1" }, position: { x: 250, y: 0 } },
  { id: "2", data: { label: "Node 2" }, position: { x: 150, y: 100 } },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const App = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback((changes) => {
    const cha = changes.filter((i) => i.type !== "remove");
    setNodes((ns) => {
      const res = applyNodeChanges(cha, ns);
      res[0].measured.height = 100;
      return res;
    });
  }, []);
  const onEdgesChange = useCallback((changes) => {
    console.log(changes);
    setEdges((es) => applyEdgeChanges(changes, es));
  }, []);
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodesDelete={(nodes) => {
          console.log("on delete nodes:", nodes);
          setNodes((ns) => {
            const res = ns.filter((i) => !nodes.some((j) => j.id == i.id));
            return res;
          });
        }}
      />
    </div>
  );
};

const rootDom = document.getElementById("app");
const root = createRoot(rootDom);
root.render(<App />);
