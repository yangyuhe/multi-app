import { Graph, Model, Shape, ToolsView, Node, ObjectExt } from "lowerX6";
import { createRoot } from "react-dom/client";
import "./index.css";
import * as React from "react";

class MyCustom extends Node {

}

MyCustom.config({
    width: 100,
    height: 40,
    markup: [
        {
            tagName: 'rect',
            selector: 'body',
        },
        {
            tagName: 'text',
            selector: 'label',
        },
    ],
    attrs: {
        body: {
            fill: '#ffffff',
            stroke: '#333333',
            strokeWidth: 2,
        },
        label: {
            fontSize: 14,
            fill: '#333333',
            refX: '50%',
            refY: '50%',
            textAnchor: 'middle',
            textVerticalAnchor: 'middle',
        },
    },
    propHooks(metadata) {
        const { label, ...others } = metadata
        if (label) {
            ObjectExt.setByPath(others, 'attrs/label/text', label)
        }
        return others
    },
})

Graph.registerNode('mycustom', MyCustom)

function App() {
    React.useEffect(() => {

        const data: Model.FromJSONData = {
            nodes: [{
                shape: "mycustom",
                x: 120,
                y: 120,
                label: "hello world",
                attrs: {
                    body: {
                        width: 100,
                        height: 100
                    }
                }
            }],
            edges: [],
        };

        const graph = new Graph({
            container: document.getElementById("container")!,
            height: 500,
            width: 500,
        });

        graph.fromJSON(data);
        setTimeout(() => {
            console.log(graph.getContentBBox(), graph.getContentArea());
        }, 1000);
    }, []);
    return <div id="container"> </div>;
}

const rootDom = document.getElementById("app");
const root = createRoot(rootDom);
root.render(<App />);