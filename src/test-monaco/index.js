import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import { createRoot } from "react-dom/client"

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '// type your code...',
        }
    }
    editorDidMount(editor, monaco) {
        console.log('editorDidMount', editor);
        editor.focus();
    }
    onChange(newValue, e) {
        console.log('onChange', newValue, e);
    }
    render() {
        const code = this.state.code;
        const options = {
            selectOnLineNumbers: true
        };
        return (
            <MonacoEditor
                width="800"
                height="600"
                language="javascript"
                theme="vs-dark"
                value={code}
                options={options}
            />
        );
    }
}

const rootDom = document.getElementById("app")
const root = createRoot(rootDom)
root.render(<App />)