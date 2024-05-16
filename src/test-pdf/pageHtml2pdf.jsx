import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import html2pdf from "html2pdf.js";
import { Input, Modal } from "@arco-design/web-react";
import "@arco-themes/react-ocean-design/css/arco.css";
import html2canvas from "html2canvas";

function App() {
  const iframeRef = React.useRef();
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
        style={{ width: "1500px" }}
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={() => {
          html2pdf(iframeRef.current)
            .then((res) => {
              console.log("success");
            })
            .catch((err) => {
              console.error(err);
            });
          // html2canvas(iframeRef.current.parentElement).then(function (canvas) {
          //   document.body.appendChild(canvas);
          // });
        }}
      >
        <div ref={iframeRef} style={{ overflow: "auto", position: "relative" }}>
          <div
            style={{
              background: "red",
              border: "1px solid blue",
              color: "white",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                border: "1px solid yellow",
                width: "100px",
                height: "50px",
                flex: "0 0 auto",
                boxSizing: "border-box",
              }}
            >
              1
            </div>
            <div
              style={{
                border: "1px solid yellow",
                width: "100px",
                height: "50px",
                flex: "0 0 auto",
                boxSizing: "border-box",
              }}
            >
              2
            </div>
            <div
              style={{
                border: "1px solid yellow",
                width: "100px",
                height: "50px",
                flex: "0 0 auto",
                boxSizing: "border-box",
              }}
            >
              3
            </div>
            <div
              style={{
                border: "1px solid yellow",
                width: "100px",
                height: "50px",
                flex: "0 0 auto",
                boxSizing: "border-box",
              }}
            >
              4
            </div>
            <div
              style={{
                border: "1px solid yellow",
                width: "100px",
                height: "50px",
                flex: "0 0 auto",
                boxSizing: "border-box",
              }}
            >
              5
            </div>
            <div
              style={{
                border: "1px solid yellow",
                width: "100px",
                height: "50px",
                flex: "0 0 auto",
                boxSizing: "border-box",
              }}
            >
              6
            </div>
            <div
              style={{
                border: "1px solid yellow",
                width: "100px",
                height: "50px",
                flex: "0 0 auto",
                boxSizing: "border-box",
              }}
            >
              7
            </div>
            <div
              style={{
                border: "1px solid yellow",
                width: "100px",
                height: "50px",
                flex: "0 0 auto",
                boxSizing: "border-box",
              }}
            >
              8
            </div>
            <div
              style={{
                border: "1px solid yellow",
                width: "100px",
                height: "50px",
                flex: "0 0 auto",
                boxSizing: "border-box",
              }}
            >
              9
            </div>
            <div
              style={{
                border: "1px solid yellow",
                width: "100px",
                height: "50px",
                flex: "0 0 auto",
                boxSizing: "border-box",
              }}
            >
              10
            </div>
            <div
              style={{
                border: "1px solid yellow",
                width: "100px",
                height: "50px",
                flex: "0 0 auto",
                boxSizing: "border-box",
              }}
            >
              11
            </div>
            <div
              style={{
                border: "1px solid yellow",
                width: "100px",
                height: "50px",
                flex: "0 0 auto",
                boxSizing: "border-box",
              }}
            >
              12
            </div>
            <div
              style={{
                border: "1px solid yellow",
                width: "100px",
                height: "50px",
                flex: "0 0 auto",
                boxSizing: "border-box",
              }}
            >
              13
            </div>
            <div
              style={{
                border: "1px solid yellow",
                width: "100px",
                height: "50px",
                flex: "0 0 auto",
                boxSizing: "border-box",
              }}
            >
              14
            </div>
            <div
              style={{
                border: "1px solid yellow",
                width: "100px",
                height: "50px",
                flex: "0 0 auto",
                boxSizing: "border-box",
              }}
            >
              15
            </div>
            <div
              style={{
                border: "1px solid yellow",
                width: "100px",
                height: "50px",
                flex: "0 0 auto",
                boxSizing: "border-box",
              }}
            >
              16
            </div>
            <div
              style={{
                border: "1px solid yellow",
                width: "100px",
                height: "50px",
                flex: "0 0 auto",
                boxSizing: "border-box",
              }}
            >
              17
            </div>
            <div
              style={{
                border: "1px solid yellow",
                width: "100px",
                height: "50px",
                flex: "0 0 auto",
                boxSizing: "border-box",
              }}
            >
              18
            </div>
            <div
              style={{
                border: "1px solid yellow",
                width: "100px",
                height: "50px",
                flex: "0 0 auto",
                boxSizing: "border-box",
              }}
            >
              19
            </div>
            <div
              style={{
                border: "1px solid yellow",
                width: "100px",
                height: "50px",
                flex: "0 0 auto",
                boxSizing: "border-box",
              }}
            >
              20
            </div>
            <div
              style={{
                border: "1px solid yellow",
                width: "100px",
                height: "50px",
                flex: "0 0 auto",
                boxSizing: "border-box",
              }}
            >
              21
            </div>
            <div
              style={{
                border: "1px solid yellow",
                width: "100px",
                height: "50px",
                flex: "0 0 auto",
                boxSizing: "border-box",
              }}
            >
              22
            </div>
            <div
              style={{
                border: "1px solid yellow",
                width: "100px",
                height: "50px",
                flex: "0 0 auto",
                boxSizing: "border-box",
              }}
            >
              23
            </div>
            <div
              style={{
                border: "1px solid yellow",
                width: "100px",
                height: "50px",
                flex: "0 0 auto",
                boxSizing: "border-box",
              }}
            >
              24
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

const rootDom = document.getElementById("app");
const root = createRoot(rootDom);
root.render(<App />);
