import { createRoot } from "react-dom/client"
import * as React from 'react'
import "../util.js"

function App() {
    return <div>app1</div>
}

const rootDom = document.getElementById("app")
const root = createRoot(rootDom)
root.render(<App />)