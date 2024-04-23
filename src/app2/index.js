import { createRoot } from "react-dom/client";
import * as React from "react";
import { types } from "mobx-state-tree"
import "./index.css"

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

async function Test() {
  const items = await Promise.resolve([1, 2])
  const Items = items.map(i => <li>{o}</li>)
  return <ul>{Items}</ul>
}
function App() {
  return (
    <p className="father">hello</p>

  );
}

const rootDom = document.getElementById("app");
const root = createRoot(rootDom);
root.render(<App />);
