import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import html2pdf from "html2pdf.js";
import { Input, Modal } from "@arco-design/web-react";
import "@arco-themes/react-ocean-design/css/arco.css";
import "./index.css";

function App() {
  const iframeRef = React.useRef(null);
  const [visible, setVisible] = useState(false);
  React.useEffect(() => {}, []);
  return (
    <div>
      <div>下载</div>
      <button
        onClick={() => {
          setVisible(true);
        }}
      >
        开始
      </button>
      <Modal
        style={{ width: "500px" }}
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={() => {
          return html2pdf(iframeRef.current, {
            margin: 80,
            html2canvas: {},
          });
        }}
      >
        <div ref={iframeRef} style={{ overflow: "auto", position: "relative" }}>
          <div className="bg-red flex flex-col  border-[red] border-[1px] items-stretch">
            <div className="bg-yellow-50  h-[50px] flex-auto box-border">
              1111
            </div>
            <img src="/test-pdf/1.png" className="w-full" />
          </div>
        </div>
      </Modal>
    </div>
  );
}

const rootDom = document.getElementById("app");
const root = createRoot(rootDom);
root.render(<App />);
