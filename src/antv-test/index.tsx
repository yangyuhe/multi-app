import { Graph, Model } from '@antv/x6';
import { createRoot } from "react-dom/client";
import "./index.css"
import * as React from "react";
import { GridLayout } from '@antv/layout'

function App() {
    React.useEffect(() => {
        const data: Model.FromJSONData = {
            nodes: [],
            edges: [],
        }
        const keyPoints = [
            [1, 4]
        ]

        for (let i = 1; i <= 8; i++) {
            data.nodes!.push({
                id: `${i}`,
                shape: 'circle',
                width: 32,
                height: 32,
                attrs: {
                    body: {
                        fill: '#5F95FF',
                        stroke: 'transparent',
                    },
                    label: {
                        fill: '#ffffff',
                    },
                },
                label: i,
                weight: 9 - i
            })
        }

        for (let i = 0; i < keyPoints.length; i += 2) {
            data.edges!.push({
                source: `${keyPoints[i][0]}`,
                target: `${keyPoints[i][1]}`,
                attrs: {
                    line: {
                        stroke: '#A2B1C3',
                        strokeWidth: 2,
                        targetMarker: null,
                    },
                },
                vertices: [
                    { x: 400, y: 50 },
                ],
                router: "orth"

            })
        }

        const graph = new Graph({
            container: document.getElementById('container')!,
            height: 500,
            width: 800
        })

        const gridLayout = new GridLayout({
            type: 'grid',
            width: 800,
            height: 500,
            begin: [0, 0],
            sortBy: 'weight',
            rows: 2,
            cols: 4,
            preventOverlap: true
        })

        const model = gridLayout.layout(data);
        graph.fromJSON(model);
        setTimeout(() => {
            console.log(graph.zoom())
        }, 1000);

    }, [])
    return <div id="container" > </div>
}

const rootDom = document.getElementById("app");
const root = createRoot(rootDom);
root.render(<App />);
