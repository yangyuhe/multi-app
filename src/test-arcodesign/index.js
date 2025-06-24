import React from "react";
import { Button, Input } from "@arco-design/web-react";
import "@arco-themes/react-ocean-design/css/arco.css";
import { createRoot } from "react-dom/client";
import { Upload, Progress } from "@arco-design/web-react";
import { IconPlus, IconEdit } from "@arco-design/web-react/icon";

function App() {
  const [file, setFile] = React.useState();
  const cs = `arco-upload-list-item${
    file && file.status === "error" ? " is-error" : ""
  }`;
  return (
    <Input.TextArea maxLength={500} showWordLimit style={{ width: 300 }} />
  );
}

const rootDom = document.getElementById("app");
const root = createRoot(rootDom);
root.render(<App />);
