import { createRoot } from "react-dom/client"
import * as React from 'react'
import "../util.js"
import Counter from "./counter.js"
import Counter2 from "./counter2.js"
import { ThemeContextProvider } from "./context.js"
import { Middle } from "./middle.js"


function App() {
    return <div>
        <ThemeContextProvider>
            <Middle>

            </Middle>
            <Counter />

            <Counter2 />
        </ThemeContextProvider>
    </div>
}

const rootDom = document.getElementById("app")
const root = createRoot(rootDom)
root.render(<App />)