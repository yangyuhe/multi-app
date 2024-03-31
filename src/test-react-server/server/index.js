import React from "react";
import { renderToPipeableStream } from 'react-dom/server';
import { Html } from '../src/app';
import fs from "fs"

const { pipe } = renderToPipeableStream(<Html />, {
    bootstrapScripts: ["/test-react-server.bundle.js"],
    onShellReady() {
        console.log("ready")
    },
    onShellError(err) {
        console.error('shellerror:', err);
    },
    onError(err) {
        console.error('error:', err)
    }
})


const write = fs.createWriteStream("../../static/index.html", { encoding: "utf-8" })
pipe(write);