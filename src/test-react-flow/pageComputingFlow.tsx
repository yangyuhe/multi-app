import React, { useCallback, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  addEdge,
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

function NumberInput(props) {
  console.log(props);
  const { updateNodeData } = useReactFlow();
  const { id, data } = props;
  const [number, setNumber] = useState(data.value);

  const onChange = useCallback((evt) => {
    const cappedNumber = Math.min(255, Math.max(0, evt.target.value));
    setNumber(cappedNumber);
    updateNodeData(id, { value: cappedNumber });
  }, []);

  return (
    <div className="number-input">
      <div>{data.label}</div>
      <input
        id={`number-${id}`}
        name="number"
        type="number"
        min="0"
        max="255"
        onChange={onChange}
        className="nodrag"
        value={number}
      />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

function CustomHandle({ id, label, onChange }) {
  const connections = useHandleConnections({
    type: "target",
    id,
  });

  const nodeData = useNodesData(connections?.[0].source);

  useEffect(() => {
    onChange(nodeData?.data ? nodeData.data.value : 0);
  }, [nodeData]);

  return (
    <div>
      <Handle
        type="target"
        position={Position.Left}
        id={id}
        className="handle"
      />
      <label htmlFor="red" className="label">
        {label}
      </label>
    </div>
  );
}

function ColorPreview({ id, data }) {
  const { updateNodeData } = useReactFlow();

  return (
    <div
      className="node"
      style={{
        background: data.value
          ? `rgb(${data.value.r}, ${data.value.g}, ${data.value.b})`
          : "rgb(0, 0, 0)",
      }}
    >
      <CustomHandle
        id="red"
        label="R"
        onChange={(value) => {
          updateNodeData(id, (node) => {
            return { value: { ...(node.data.value as any), r: value } };
          });
        }}
      />
      <CustomHandle
        id="green"
        label="G"
        onChange={(value) => {
          updateNodeData(id, (node) => {
            return { value: { ...(node.data.value as any), g: value } };
          });
        }}
      />
      <CustomHandle
        id="blue"
        label="B"
        onChange={(value) => {
          updateNodeData(id, (node) => {
            return { value: { ...(node.data.value as any), b: value } };
          });
        }}
      />
      <Handle type="source" position={Position.Right} id="output" />
    </div>
  );
}

const nodeTypes = {
  NumberInput,
  ColorPreview,
  Lightness: LightnessNode,
  Log,
};

const initialNodes = [
  {
    type: "NumberInput",
    id: "1",
    data: { label: "Red", value: 255 },
    position: { x: 0, y: 0 },
  },
  {
    type: "NumberInput",
    id: "2",
    data: { label: "Green", value: 0 },
    position: { x: 0, y: 100 },
  },
  {
    type: "NumberInput",
    id: "3",
    data: { label: "Blue", value: 115 },
    position: { x: 0, y: 200 },
  },
  {
    type: "ColorPreview",
    id: "color",
    position: { x: 150, y: 50 },
    data: {
      label: "Color",
      value: { r: undefined, g: undefined, b: undefined },
    },
  },
  {
    type: "Lightness",
    id: "lightness",
    position: { x: 350, y: 75 },
    data: {},
  },
  {
    id: "log-1",
    type: "Log",
    position: { x: 500, y: 0 },
    data: { label: "Use black font", fontColor: "black" },
  },
  {
    id: "log-2",
    type: "Log",
    position: { x: 500, y: 140 },
    data: { label: "Use white font", fontColor: "white" },
  },
];

const initialEdges = [
  {
    id: "1-color",
    source: "1",
    target: "color",
    targetHandle: "red",
  },
  {
    id: "2-color",
    source: "2",
    target: "color",
    targetHandle: "green",
  },
  {
    id: "3-color",
    source: "3",
    target: "color",
    targetHandle: "blue",
  },
  {
    id: "color-lightness",
    source: "color",
    target: "lightness",
  },
  {
    id: "lightness-log-1",
    source: "lightness",
    sourceHandle: "light",
    target: "log-1",
  },
  {
    id: "lightness-log-2",
    source: "lightness",
    sourceHandle: "dark",
    target: "log-2",
  },
];

function LightnessNode({ id }) {
  const { updateNodeData } = useReactFlow();
  const connections = useHandleConnections({ type: "target" });
  const nodesData = useNodesData(connections?.[0].source);

  const [lightness, setLightness] = useState("dark");

  useEffect(() => {
    if (nodesData?.data) {
      const color = nodesData.data.value as any;
      const isLight =
        0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b >= 128;
      setLightness(isLight ? "light" : "dark");
      const newNodeData = isLight
        ? { light: color, dark: null }
        : { light: null, dark: color };
      updateNodeData(id, newNodeData);
    } else {
      updateNodeData(id, { light: null, dark: { r: 0, g: 0, b: 0 } });
      setLightness("dark");
    }
  }, [nodesData]);

  return (
    <div
      className="lightness-node"
      style={{
        background: lightness === "light" ? "white" : "black",
        color: lightness === "light" ? "black" : "white",
      }}
    >
      <Handle type="target" position={Position.Left} />
      <p style={{ marginRight: 10 }}>Light</p>
      <Handle
        type="source"
        id="light"
        position={Position.Right}
        style={{ top: 25 }}
      />
      <p style={{ marginRight: 10 }}>Dark</p>
      <Handle
        type="source"
        id="dark"
        position={Position.Right}
        style={{ top: 75 }}
      />
    </div>
  );
}

function Log({ data }) {
  const connections = useHandleConnections({ type: "target" });

  const nodeData = useNodesData(connections?.[0].source);

  const color: any = nodeData.data
    ? nodeData.data[connections?.[0].sourceHandle]
    : null;

  return (
    <div
      className="log-node"
      style={{
        background: color ? `rgb(${color.r}, ${color.g}, ${color.b})` : "white",
        color: color ? data.fontColor : "black",
      }}
    >
      {color ? data.label : "Do nothing"}
      <Handle type="target" position={Position.Left} />
    </div>
  );
}

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
      </ReactFlow>
    </div>
  );
}

const rootDom = document.getElementById("app");
const root = createRoot(rootDom);
root.render(<App />);
