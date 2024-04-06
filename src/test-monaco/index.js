import React, { useEffect, useRef } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { createRoot } from "react-dom/client"
import * as monaco from "monaco-editor"
import metadata from 'monaco-editor/esm/metadata';

console.log("metadata.languages:", metadata)

// self.MonacoEnvironment = {
//     getWorkerUrl: function (moduleId, label) {
//         if (label === 'json') {
//             return './json.worker.bundle.js';
//         }
//         if (label === 'css' || label === 'scss' || label === 'less') {
//             return './css.worker.bundle.js';
//         }
//         if (label === 'html' || label === 'handlebars' || label === 'razor') {
//             return './html.worker.bundle.js';
//         }
//         if (label === 'typescript' || label === 'javascript') {
//             return './ts.worker.bundle.js';
//         }
//         return './editor.worker.bundle.js';
//     }
// };

async function getAssetContent(path) {
    return fetch(path).then(res => res.text())
}
async function getAssets() {
    return {
        "/foo.js": await getAssetContent("/foo.js"),
        "/index.js": await getAssetContent("/index.js"),
    }
}

export function App() {
    const containerRef = React.useRef()
    const editorRef = React.useRef()

    useEffect(() => {
        (async () => {
            editorRef.current = monaco.editor.create(containerRef.current)
            const assets = await getAssets()
            console.log(assets)
            Object.entries(assets).forEach(item => {
                const uri = new monaco.Uri().with({ path: item[0] })
                console.log(uri)
                monaco.editor.createModel(item[1], 'javascript', uri)
            })
            const models = monaco.editor.getModels()
            editorRef.current.setModel(models[2])
        })()



    }, [])

    return <div ref={containerRef} style={{ height: '500px' }}>

    </div>

}

const rootDom = document.getElementById("app")
const root = createRoot(rootDom)
root.render(<App />)