import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import html2pdf from "html2pdf.js";
import { Input, Modal } from "@arco-design/web-react";
import '@arco-themes/react-ocean-design/css/arco.css';

function App() {
  const iframeRef = React.useRef();
  const [visible,setVisible]=useState(false)
  React.useEffect(() => {}, []);
  return (
    <div>
      <div>下载</div>
      <button
        onClick={() => {
          setVisible(true)
        }}
      >
        开始
      </button>
      <Modal  visible={visible} onCancel={()=>setVisible(false)} onOk={()=>{
        html2pdf(iframeRef.current,{margin:20});
      }}>
        <div ref={iframeRef} style={{height:'500px',overflow:'auto',position:'relative'}}>
          <Input style={{position:'absolute',top:0,left:0}} placeholder="hello"/>
        {Array(100).fill(0).map(()=>{
          return <div>hello</div>
        })}
        </div>
      </Modal>
    </div>
  );
}

const rootDom = document.getElementById("app");
const root = createRoot(rootDom);
root.render(<App />);
