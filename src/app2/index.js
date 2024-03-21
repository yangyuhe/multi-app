import { createRoot } from "react-dom/client";
import * as React from "react";
import "../util";
import "./index.css";
import * as _ from "lodash";
import dest from "./dest.json";
import source from "./source.json";

const res = _.merge(dest, source);
debugger;

function App() {
  return (
    <>
      <div className="mark"></div>
      <div className="border-image">app2</div>
      <em-emoji id="grinning" />
    </>
  );
}

const rootDom = document.getElementById("app");
const root = createRoot(rootDom);
root.render(<App />);
