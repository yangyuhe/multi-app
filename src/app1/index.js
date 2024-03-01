import { createRoot } from "react-dom/client"
import * as React from 'react'
import "../util.js"
import Counter from "./counter.js"

function App() {
    return <div><Counter /></div>
}

const rootDom = document.getElementById("app")
const root = createRoot(rootDom)
root.render(<App />)