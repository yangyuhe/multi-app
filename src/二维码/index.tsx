import { createRoot } from "react-dom/client";
import * as React from "react";
import "../util.js";
import QRCode from "qrcode";

function App() {
  const [show, setShow] = React.useState(false);
  const [data, setData] = React.useState("");
  React.useEffect(() => {
    QRCode.toString("https://www.baidu.com", function (err, string) {
      if (err) throw err;
      console.log(string);
      setData(btoa(string));
    });
  }, []);
  return (
    <img
      style={{ height: "100px" }}
      src={`data:image/svg+xml;base64,${data}`}
    />
  );
}

const rootDom = document.getElementById("app");
const root = createRoot(rootDom);
root.render(<App />);
