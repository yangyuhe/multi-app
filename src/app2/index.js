import { createRoot } from "react-dom/client";
import * as React from "react";
import "../util";
import "./index.css";

function App() {
  return (
    <>
      <div className="mark"></div>
      <div className="border-image">app2</div>
    </>
  );
}

const rootDom = document.getElementById("app");
const root = createRoot(rootDom);
root.render(<App />);
