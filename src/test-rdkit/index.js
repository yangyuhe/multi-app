import { createRoot } from "react-dom/client";
import * as RDKit from "@rdkit/rdkit";
import * as React from "react";

function App() {
  React.useEffect(() => {
    console.log(RDKit.initRDKitModule);
  }, []);
  return <h1>hello</h1>;
}

const rootDom = document.getElementById("app");
const root = createRoot(rootDom);
root.render(<App />);
