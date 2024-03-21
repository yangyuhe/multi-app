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
      <div className="father">
        <div className="top"></div>
        <div className="content">
          <div className="subtop"></div>
          <div className="subcontent">
            <div className="left">
              {Array(10).fill(0).map((item, index) => {
                return <div>{index}</div>
              })}
            </div>
            <div className="right">
              {Array(10).fill(0).map((item, index) => {
                return <div>{index}</div>
              })}
            </div>
          </div>


        </div>
      </div>
    </>
  );
}

const rootDom = document.getElementById("app");
const root = createRoot(rootDom);
root.render(<App />);
