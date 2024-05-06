import React from "react";
import { createRoot } from "react-dom/client";
import html2pdf from "html2pdf.js";

function App() {
  const iframeRef = React.useRef();
  React.useEffect(() => {}, []);
  return (
    <div>
      <div ref={iframeRef}>下载</div>
      <button
        onClick={() => {
          html2pdf(document.body);
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
