import React, { Suspense } from "react";
import Button from "./button";
import { UserContextProvider } from "./context.js";

export function UserLoading() {
    return <div>user loading...</div>
}


function sleep(time) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res()
        }, time);
    })
}
const LazyUsers = React.lazy(async () => {
    await sleep(3000)
    return import("./user.js")
})
export function Html() {
    return <html>
        <head>
            <title>my app</title>
        </head>
        <body>
            <div id="app">
                <App />
            </div>
        </body>
    </html>
}
export function App() {
    return <UserContextProvider>
        <div>
            <h1>app</h1>
            <Button>start</Button>
        </div>
        <Suspense fallback={<UserLoading />}>
            <LazyUsers />
        </Suspense>
    </UserContextProvider>
}