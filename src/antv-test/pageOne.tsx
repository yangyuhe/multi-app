import { Graph, Shape } from '@antv/x6'
import { Stencil } from '@antv/x6-plugin-stencil'
import { createRoot } from "react-dom/client";
import * as React from "react";
import './pageOne.css'


function App() {
    React.useEffect(() => {
        const graph = new Graph({
            container: document.getElementById('graph-container')!,
            grid: true,
            height: 500,
            width: 800,
            mousewheel: {
                enabled: true,
                zoomAtMousePosition: true,
                modifiers: 'ctrl',
                minScale: 0.5,
                maxScale: 3,
            },
            connecting: {
                router: 'manhattan',
                connector: {
                    name: 'rounded',
                    args: {
                        radius: 8,
                    },
                },
                anchor: 'center',
                connectionPoint: 'anchor',
                allowBlank: false,
                snap: {
                    radius: 20,
                },
                createEdge() {
                    return new Shape.Edge({
                        attrs: {
                            line: {
                                stroke: '#A2B1C3',
                                strokeWidth: 2,
                                targetMarker: {
                                    name: 'block',
                                    width: 12,
                                    height: 8,
                                },
                            },
                        },
                        zIndex: 0,
                    })
                },
                validateConnection({ targetMagnet }) {
                    return !!targetMagnet
                },
            },
            highlighting: {
                magnetAdsorbed: {
                    name: 'stroke',
                    args: {
                        attrs: {
                            fill: 'red',
                            stroke: '#5F95FF',
                        },
                    },
                },
            },
        })
        const stencil = new Stencil({
            title: '流程图',
            target: graph,
            stencilGraphWidth: 200,
            stencilGraphHeight: 500,
            collapsable: true,
            groups: [
                {
                    title: '基础流程图',
                    name: 'group1',
                },
                {
                    title: '系统设计图',
                    name: 'group2',
                    graphHeight: 250,
                    layoutOptions: {
                        rowHeight: 70,
                    },
                },
            ],
            layoutOptions: {
                columns: 2,
                columnWidth: 80,
                rowHeight: 55,
            },
        })
        document.getElementById('stencil')!.appendChild(stencil.container)

        // 控制连接桩显示/隐藏
        const showPorts = (ports: NodeListOf<SVGElement>, show: boolean) => {
            for (let i = 0, len = ports.length; i < len; i += 1) {
                ports[i].style.visibility = show ? 'visible' : 'hidden'
            }
        }
        graph.on('node:mouseenter', () => {
            const container = document.getElementById('graph-container')!
            const ports = container.querySelectorAll(
                '.x6-port-body',
            ) as NodeListOf<SVGElement>
            showPorts(ports, true)
        })
        graph.on('node:mouseleave', () => {
            const container = document.getElementById('graph-container')!
            const ports = container.querySelectorAll(
                '.x6-port-body',
            ) as NodeListOf<SVGElement>
            showPorts(ports, false)
        })

        // #region 初始化图形
        const ports = {
            groups: {
                top: {
                    position: 'top',
                    attrs: {
                        circle: {
                            r: 4,
                            magnet: true,
                            stroke: '#5F95FF',
                            strokeWidth: 1,
                            fill: '#fff',
                            style: {
                                visibility: 'hidden',
                            },
                        },
                    },
                },
                right: {
                    position: 'right',
                    attrs: {
                        circle: {
                            r: 4,
                            magnet: true,
                            stroke: '#5F95FF',
                            strokeWidth: 1,
                            fill: '#fff',
                            style: {
                                visibility: 'hidden',
                            },
                        },
                    },
                },
                bottom: {
                    position: 'bottom',
                    attrs: {
                        circle: {
                            r: 4,
                            magnet: true,
                            stroke: '#5F95FF',
                            strokeWidth: 1,
                            fill: '#fff',
                            style: {
                                visibility: 'hidden',
                            },
                        },
                    },
                },
                left: {
                    position: 'left',
                    attrs: {
                        circle: {
                            r: 4,
                            magnet: true,
                            stroke: '#5F95FF',
                            strokeWidth: 1,
                            fill: '#fff',
                            style: {
                                visibility: 'hidden',
                            },
                        },
                    },
                },
            },
            items: [
                {
                    group: 'top',
                },
                {
                    group: 'right',
                },
                {
                    group: 'bottom',
                },
                {
                    group: 'left',
                },
            ],
        }

        Graph.registerNode(
            'custom-rect',
            {
                inherit: 'rect',
                width: 66,
                height: 36,
                attrs: {
                    body: {
                        strokeWidth: 1,
                        stroke: '#5F95FF',
                        fill: '#EFF4FF',
                    },
                    text: {
                        fontSize: 12,
                        fill: '#262626',
                    },
                },
                ports: { ...ports },
            },
            true,
        )

        Graph.registerNode(
            'custom-polygon',
            {
                inherit: 'polygon',
                width: 66,
                height: 36,
                attrs: {
                    body: {
                        strokeWidth: 1,
                        stroke: 'red',
                        fill: '#EFF4FF',
                    },
                    text: {
                        fontSize: 12,
                        fill: '#262626',
                    },
                },
                ports: {
                    ...ports,
                    items: [
                        {
                            group: 'top',
                        },
                        {
                            group: 'bottom',
                        },
                    ],
                },
            },
            true,
        )

        Graph.registerNode(
            'custom-circle',
            {
                inherit: 'circle',
                width: 45,
                height: 45,
                attrs: {
                    body: {
                        strokeWidth: 1,
                        stroke: '#5F95FF',
                        fill: '#EFF4FF',
                    },
                    text: {
                        fontSize: 12,
                        fill: '#262626',
                    },
                },
                ports: { ...ports },
            },
            true,
        )

        Graph.registerNode(
            'custom-image',
            {
                inherit: 'rect',
                width: 52,
                height: 52,
                markup: [
                    {
                        tagName: 'rect',
                        selector: 'body',
                    },
                    {
                        tagName: 'image',
                    },
                    {
                        tagName: 'text',
                        selector: 'label',
                    },
                ],
                attrs: {
                    body: {
                        stroke: '#5F95FF',
                        fill: '#5F95FF',
                    },
                    image: {
                        width: 26,
                        height: 26,
                        refX: 13,
                        refY: 16,
                    },
                    label: {
                        refX: 3,
                        refY: 2,
                        textAnchor: 'left',
                        textVerticalAnchor: 'top',
                        fontSize: 12,
                        fill: '#fff',
                    },
                },
                ports: { ...ports },
            },
            true,
        )

        const r1 = graph.createNode({
            shape: 'custom-rect',
            label: '开始',
            attrs: {
                body: {
                    rx: 20,
                    ry: 26,
                },
            },
        })
        const r2 = graph.createNode({
            shape: 'custom-rect',
            label: '过程',
        })
        const r3 = graph.createNode({
            shape: 'custom-rect',
            attrs: {
                body: {
                    rx: 6,
                    ry: 6,
                },
            },
            label: '可选过程',
        })
        const r4 = graph.createNode({
            shape: 'custom-polygon',
            attrs: {
                body: {
                    refPoints: '0,10 10,0 20,10 10,20',
                },
            },
            label: '决策',
        })
        const r5 = graph.createNode({
            shape: 'custom-polygon',
            attrs: {
                body: {
                    refPoints: '10,0 40,0 30,20 0,20',
                },
            },
            label: '数据',
        })
        const r6 = graph.createNode({
            shape: 'custom-circle',
            label: '连接',
        })
        stencil.load([r1, r2, r3, r4, r5, r6], 'group1')

        const imageShapes = [
            {
                label: 'Client',
                image:
                    'https://gw.alipayobjects.com/zos/bmw-prod/687b6cb9-4b97-42a6-96d0-34b3099133ac.svg',
            },
            {
                label: 'Http',
                image:
                    'https://gw.alipayobjects.com/zos/bmw-prod/dc1ced06-417d-466f-927b-b4a4d3265791.svg',
            },
            {
                label: 'Api',
                image:
                    'https://gw.alipayobjects.com/zos/bmw-prod/c55d7ae1-8d20-4585-bd8f-ca23653a4489.svg',
            },
            {
                label: 'Sql',
                image:
                    'https://gw.alipayobjects.com/zos/bmw-prod/6eb71764-18ed-4149-b868-53ad1542c405.svg',
            },
            {
                label: 'Clound',
                image:
                    'https://gw.alipayobjects.com/zos/bmw-prod/c36fe7cb-dc24-4854-aeb5-88d8dc36d52e.svg',
            },
            {
                label: 'Mq',
                image:
                    'https://gw.alipayobjects.com/zos/bmw-prod/2010ac9f-40e7-49d4-8c4a-4fcf2f83033b.svg',
            },
        ]
        const imageNodes = imageShapes.map((item) =>
            graph.createNode({
                shape: 'custom-image',
                label: item.label,
                attrs: {
                    image: {
                        'xlink:href': item.image,
                    },
                },
            }),
        )
        stencil.load(imageNodes, 'group2')

    }, [])
    return <div id="container">
        <div id="stencil"></div>
        <div id="graph-container"></div>
    </div>
}

const rootDom = document.getElementById("app");
const root = createRoot(rootDom);
root.render(<App />);