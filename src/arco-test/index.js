import { createRoot } from "react-dom/client";
import * as React from "react";
// import { Table } from "@arco-design/web-react";

import "@arco-themes/react-cecloud-design/css/arco.css";
import "@ccf2e/arco-material/dist/css/index.css";
// 引入该文件后，业务不需要单独添加iconfont依赖的文件
import "@ccf2e/arco-material/lib/style/css.js";

import { MonitorViewBasic } from "./monitor";

function App() {
  return <MonitorViewBasic></MonitorViewBasic>;
}

const rootDom = document.getElementById("app");
const root = createRoot(rootDom);
root.render(<App />);
