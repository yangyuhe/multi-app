import { createRoot } from "react-dom/client";
import * as React from "react";
import "./index.css";

function App() {
  const [info, setInfo] = React.useState({});
  React.useEffect(() => {
    console.log("init");
    let fn = () => {
      setInfo({
        innerWidth: window.innerWidth,
        outerWidth: window.outerWidth,
        innerHeight: window.innerHeight,
        outerHeight: window.outerHeight,
        devicePixelRatio: window.devicePixelRatio,
      });
    };
    fn();
    window.addEventListener("resize", fn);
    console.log(window.navigator.userAgent);
    return () => {
      window.removeEventListener("resize", fn);
    };
  }, []);
  return (
    <>
      <div className="flex">
        <div className="bg-[green] text-white text-[14px] size-[300px]">
          {Object.keys(info).map((key) => {
            return (
              <div key={key}>
                window.{key}:{info[key]}
              </div>
            );
          })}
        </div>
        <div className="h-[663px] w-[20px] bg-red-500"></div>
        <div className="h-[1000px] w-[20px] bg-[blue]"></div>
      </div>
      <input type="file" />
    </>
  );
}

const rootDom = document.getElementById("app");
const root = createRoot(rootDom);
root.render(<App />);
