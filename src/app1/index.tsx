import { createRoot } from "react-dom/client";
import * as React from "react";
// import { Table } from "@arco-design/web-react";

import "@arco-themes/react-cecloud-design/css/arco.css";
import "@ccf2e/arco-material/dist/css/index.css";
// 引入该文件后，业务不需要单独添加iconfont依赖的文件
import "@ccf2e/arco-material/lib/style/css.js";

import { Steps } from "@arco-design/web-react";
const Step = Steps.Step;
function App() {
  return (
    <>
      <Steps className="bg">
        <Step title="Succeeded" />
        <Step title="Processing" />
        <Step title="Pending" />
      </Steps>
    </>
  );
}

const rootDom = document.getElementById("app");
const root = createRoot(rootDom as any);
root.render(<App />);
