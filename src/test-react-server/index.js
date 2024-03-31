import { hydrateRoot } from "react-dom/client"
import * as React from 'react'
import { App } from "./src/app"

const rootDom = document.querySelector("#app")
const root = hydrateRoot(rootDom, <App />)