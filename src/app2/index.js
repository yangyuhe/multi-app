import { createRoot } from "react-dom/client"
import * as React from 'react'
import "../util"


function App() {
    return <div>app2</div>
}

const rootDom = document.getElementById("app")
const root = createRoot(rootDom)
root.render(<App />)