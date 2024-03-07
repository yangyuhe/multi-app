import React, { useEffect, useRef } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { createRoot } from "react-dom/client"
import * as monaco from "monaco-editor"

self.MonacoEnvironment = {
    getWorkerUrl: function (moduleId, label) {
        if (label === 'json') {
            return './json.worker.bundle.js';
        }
        if (label === 'css' || label === 'scss' || label === 'less') {
            return './css.worker.bundle.js';
        }
        if (label === 'html' || label === 'handlebars' || label === 'razor') {
            return './html.worker.bundle.js';
        }
        if (label === 'typescript' || label === 'javascript') {
            return './ts.worker.bundle.js';
        }
        return './editor.worker.bundle.js';
    }
};

export function App() {

    const div = useRef(null)
    useEffect(() => {
        var editor = monaco.editor.create(div.current, {
            value: "// First line\nfunction hello() {\n\talert('Hello world!');\n}\n// Last line",
            language: "javascript",

            lineNumbers: "off",
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: false,
            theme: "vs-dark",
        });
        setTimeout(function () {
            editor.updateOptions({
                lineNumbers: "on",
            });
        }, 2000);
    }, [])
    return (
        // <MonacoEditor
        //     width="800"
        //     height="600"
        //     language="javascript"
        //     theme="vs-dark"
        //     value={code}
        //     options={options}
        // />
        <div style={{ height: "500px" }} ref={div}></div>
    );
}

const rootDom = document.getElementById("app")
const root = createRoot(rootDom)
root.render(<App />)