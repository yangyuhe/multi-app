import { createRoot } from "react-dom/client"
import * as React from 'react'
import "../util.js"
import Counter from "./counter.js"
import Counter2 from "./counter2.js"

function App() {
    return <div><Counter /><Counter2 /></div>
}

const rootDom = document.getElementById("app")
const root = createRoot(rootDom)
root.render(<App />)