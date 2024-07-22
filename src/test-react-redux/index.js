import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";

import { Provider, useSelector } from "react-redux";
import { store } from "./store";

// As of React 18
const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

function App() {
  const count = useSelector((state) => {
    return state?.plugins.part.count;
  });
  useEffect(() => {
    setInterval(() => {
      store.dispatch({
        type: "add",
      });
      console.log("滴答");
    }, 1000);
  }, []);
  console.log("count:", count);
  ``;
  useEffect(() => {
    let div = document.createElement("div");
    div.innerHTML = "<h1>hello</h1>";
    document.querySelector(".testme").append(div);
  }, []);
  return (
    <div className="testme">
      <div>{count}</div>
    </div>
  );
}
