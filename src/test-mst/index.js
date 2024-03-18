import { autorun } from "mobx"
import { types, onSnapshot, onPatch, onAction } from "mobx-state-tree"

const Todo = types
    .model("Todo", {
        title: types.string,
        done: false
    })
    .actions((self) => ({
        toggle() {
            self.done = !self.done
        }
    }))

const Cat = types.model("Cat", {
    name: types.string,
    date: types.literal("hello")
}).actions(self => {
    return {
        miaomiao() {
            console.log("miaomiao")
        }
    }
})

const TodoCat = types.compose('todocat', Todo, Cat)

const stroreComplex = TodoCat.create({
    title: "xx",
    done: false,
    name: "yellow",
    date: "hello"
})
stroreComplex.miaomiao()
console.log("value:", stroreComplex.date)
console.log(stroreComplex.toString())

const TodoCatUnion = types.union(Todo, Cat)
const union = TodoCatUnion.create({
    done: false,
    name: "xx",
    date: "hello"
})
union.miaomiao()



const Store = types.model("Store", {
    todos: types.array(Todo)
})

// create an instance from a snapshot
const store = Store.create({
    todos: [
        {
            title: "Get coffee"
        }
    ]
})

// listen to new snapshots
onSnapshot(store, (snapshot) => {
    console.dir(snapshot)
})
autorun(() => {
    console.log(store.todos[0].title, store.todos[0].done)
})

onPatch(store, patch => {
    console.log("got change:", patch)
})

onAction(store, act => {
    console.log("action invoke:", act)
})
// invoke action that modifies the tree
setTimeout(() => {
    store.todos[0].toggle()
}, 3000);


// prints: `{ todos: [{ title: "Get coffee", done: true }]}`