import { createRoot } from "react-dom/client";
import * as React from "react";
import { types } from "mobx-state-tree"

const Store = types.model({
  person: types.maybeNull(types.model({
    name: types.string,
    age: types.integer
  }))
}).actions(self => {
  return {
    setPerson(person) {
      self.person = person
    }
  }
})
const store = Store.create({
  person: null
})
let person = {
  name: 'hx',
  age: 12,
  address: "88"
}
store.setPerson(person)
console.log(store.person, person);


function App() {
  return (
    <>
      <div className="father">
        <div className="top"></div>
        <div className="content">
          <div className="subtop"></div>
          <div className="subcontent">
            <div className="left">
              {Array(10).fill(0).map((item, index) => {
                return <div>{index}</div>
              })}
            </div>
            <div className="right">
              {Array(10).fill(0).map((item, index) => {
                return <div>{index}</div>
              })}
            </div>
          </div>


        </div>
      </div>
    </>
  );
}

const rootDom = document.getElementById("app");
const root = createRoot(rootDom);
root.render(<App />);
