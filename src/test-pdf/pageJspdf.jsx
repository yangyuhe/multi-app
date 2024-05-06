import React from "react";
import { createRoot } from "react-dom/client";
import { jsPDF } from "jspdf";
import "./weiruanyahei-normal";
import "./pageJspdf.css";

const doc = new jsPDF();
doc.setFont("weiruan");

function App() {
  const iframeRef = React.useRef();
  React.useEffect(() => {}, []);
  return (
    <div>
      <div className="weiruanyahei" ref={iframeRef}>
        下载中国
      </div>
      <button
        onClick={() => {
          doc.text("hello下载中国", 10, 10);
          doc.save("a4.pdf");
        }}
      >
        开始
      </button>
    </div>
  );
}

const rootDom = document.getElementById("app");
const root = createRoot(rootDom);
root.render(<App />);
