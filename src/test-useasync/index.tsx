import { createRoot } from "react-dom/client";
import * as React from "react";
import { useAsync } from "@react-hookz/web";

function sleep(num) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res("ok now!" + num);
    }, 1000);
  });
}
function App() {
  const [count, setCount] = React.useState(0);

  const [r1, r2, r3] = useAsync(async (num) => {
    console.log("执行了,args:", num);
    return sleep(num);
  }, 1000);
  console.log(r1, r2, r3);

  React.useEffect(() => {
    r2.execute(count);
  }, [r2, count]);

  return (
    <div>
      {count}
      <button onClick={() => setCount((c) => c + 1)}>add</button>
    </div>
  );
}

const rootDom = document.getElementById("app");
const root = createRoot(rootDom);
root.render(<App />);
