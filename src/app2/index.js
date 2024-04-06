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
      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title text-xl font-medium">
          Click to open this one and close others
        </div>
        <div className="collapse-content">
          <p>hello</p>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">
          Click to open this one and close others
        </div>
        <div className="collapse-content">
          <p>hello</p>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">
          Click to open this one and close others
        </div>
        <div className="collapse-content">
          <p>hello</p>
        </div>
      </div>
    </>
  );
}

const rootDom = document.getElementById("app");
const root = createRoot(rootDom);
root.render(<App />);
