import { createRoot } from "react-dom/client"
import * as React from 'react'
import "../util.js"
import Counter from "./counter.js"
import Counter2 from "./counter2.js"
import { ThemeContextProvider } from "./context.js"
import { Middle } from "./middle.js"
import { SWRConfig } from "swr"


function App() {
    const [show, setShow] = React.useState(false)
    return <div>
        <SWRConfig value={{ refreshInterval: 1000 }}>
            <ThemeContextProvider>
                {show ? <Counter /> : null}
                {show ? null : <Counter2 />}
                <button onClick={() => setShow(show => !show)}>toggle</button>
            </ThemeContextProvider>
        </SWRConfig>
    </div>
}

const rootDom = document.getElementById("app")
const root = createRoot(rootDom)
root.render(<App />)