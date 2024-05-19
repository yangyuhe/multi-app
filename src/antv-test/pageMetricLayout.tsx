import { EdgeView, Graph, Model, NodeView, Options, Path, Point, Shape, ToolsView } from "@antv/x6";
import { createRoot } from "react-dom/client";
import "./index.css";
import * as React from "react";
import { GridLayout } from "@antv/layout";


Graph.registerRouter('random', randomRouter)

// 路由参数
interface RandomRouterArgs {
  bounces?: number
}

function randomRouter(vertices: Point.PointLike[], args: RandomRouterArgs, view: EdgeView) {
  console.log(view.sourceBBox, view.targetBBox)
  return []
}

function App() {
  React.useEffect(() => {
    const data = {
      nodes: [],
      edges: [],
    };

    let total = 5;

    for (let i = 0; i < total; i++) {
      data.nodes!.push({
        id: `${i}`,
        shape: "rect",
        label: "GPU" + i,
        width: 80,
        height: 80,
        weight: total - i
      });
    }

    function wobble(
      sourcePoint: Point.PointLike,
      targetPoint: Point.PointLike,
      routePoints: Point.PointLike[],
      args,
      edgeView: EdgeView
    ) {
      console.log((edgeView.sourceView as NodeView).cell.id, (edgeView.targetView as NodeView).cell.id, routePoints)

      const delt = (a: Point.PointLike, b: Point.PointLike) => {
        if (Math.abs(a.x - b.x) < 2) {
          a.x = b.x = a.x + Math.random() * 40 - 20

          return;
        }
        if (Math.abs(a.y - b.y) < 2) {
          a.y = b.y = b.y + Math.random() * 40 - 20
          return;
        }
      }
      if (routePoints.length > 0) {
        delt(sourcePoint, routePoints[0])
        delt(targetPoint, routePoints[routePoints.length - 1])
      }
      const points = [...routePoints, targetPoint].map((p) => Point.create(p))
      let prev = Point.create(sourcePoint)
      const path = new Path(Path.createSegment('M', prev))

      for (let i = 0, n = points.length; i < n; i += 1) {
        const next = points[i]

        path.appendSegment(Path.createSegment('L', next))
      }
      return args.raw ? path : path.serialize();
    }

    Graph.registerConnector('wobble', wobble)

    // for (let i = 0; i < total; i++) {
    //   for (let j = i + 1; j < total; j++) {
    //     data.edges!.push({
    //       source: "" + i,
    //       target: "" + j,
    //       attrs: {
    //         line: {
    //           stroke: "#10B981",
    //           strokeWidth: 1,
    //           sourceMarker: "block",
    //           targetMarker: "block",
    //         },
    //       },
    //       labels: [{
    //         markup: [
    //           {
    //             tagName: 'rect',
    //             selector: 'body',
    //           },
    //           {
    //             tagName: 'text',
    //             selector: 'label',
    //           },
    //         ],
    //         attrs: {
    //           label: {
    //             fill: '#000',
    //             fontSize: 14,
    //             textAnchor: 'middle',
    //             textVerticalAnchor: 'middle',
    //             pointerEvents: 'none',
    //             text: i + ',' + j
    //           },
    //           rect: {
    //             ref: 'label',
    //             fill: 'green',
    //             rx: 3,
    //             ry: 3,
    //             refWidth: 1,
    //             refHeight: 1,
    //             refX: 0,
    //             refY: 0,
    //           },
    //         },
    //         position: {
    //           distance: 0.5,
    //         },
    //       }],
    //       router: {
    //         name: "manhattan",
    //         args: {
    //           padding: Math.random() * 10 + 20,
    //         },
    //       },
    //       connector: {
    //         name: 'wobble',
    //         args: {},
    //       },
    //     });
    //   }
    // }

    data.edges!.push({
      source: '0',
      target: '2',
      // router: {
      //   name: "orth",
      //   args: {
      //     padding: 30,
      //   },
      // },
      attrs: {
        line: {
          stroke: 'blue',
          sourceMarker: 'block',
          targetMarker: 'circle'
        }
      },
      vertices: [{ x: 250, y: 100 }, { x: 300, y: 200 }, { x: 900, y: 250 }]
    });

    // data.edges!.push({
    //   source: '0',
    //   target: '2',
    //   router: {
    //     name: "orth",
    //     args: {
    //       padding: 30,
    //     },
    //   },
    //   vertices: [{ x: 280, y: 100 }, { x: 300, y: 200 }, { x: 900, y: 250 }]
    // });

    const canvasHeight = 520;
    const canvasWidth = 1182;

    const graph = new Graph({
      container: document.getElementById("container")!,
      height: canvasHeight,
      width: canvasWidth,
    });



    const gridLayout = new GridLayout({
      type: "grid",
      width: canvasWidth,
      height: canvasHeight,
      rows: 4,
      cols: 4,
      onLayoutEnd() { },
      sortBy: "weight",
    });

    const model = gridLayout.layout(data);
    console.log(model);

    graph.fromJSON(model);
    console.log(graph.getCellById('4').getBBox());

    graph.on('edge:mouseenter', ({ e, edge, view }) => {
      edge.toFront()
      edge.attr('line/stroke', 'red')
    })

    graph.on('edge:mouseleave', ({ e, edge, view }) => {
      edge.attr('line/stroke', 'blue')
    })

    graph.addNode(new Shape.Circle({
      attrs: {
        label: {
          text: "0,0",
          refX: 20,
          refY: 20,
        }
      },
      size: {
        width: 10,
        height: 10
      },
      x: -5,
      y: -5
    }))

    graph.addNode(new Shape.Circle({
      attrs: {
        label: {
          text: "100,100",
          refX: 20,
          refY: 20,
        }
      },
      size: {
        width: 10,
        height: 10
      },
      x: 95,
      y: 95,

    }))
    graph.enablePanning()


    document.getElementById("container").addEventListener("mousemove", (e) => {
      console.log("client:", e.pageX, e.pageY)
      console.log("local:", graph.pageToLocal(e.pageX, e.pageY))
      console.log("graph:", graph.localToGraph(graph.pageToLocal(e.pageX, e.pageY)))
    })
    graphRef.current = graph



  }, []);
  const scaleRef = React.useRef(1)
  const graphRef = React.useRef<Graph>(null)
  return <>
    <div style={{ position: "fixed", right: '100px', top: 0 }}>
      <button onClick={() => {
        scaleRef.current -= 0.2;
        graphRef.current.zoomTo(scaleRef.current)
      }}>缩小</button>
      <button onClick={() => {
        scaleRef.current += 0.2;
        graphRef.current.zoomTo(scaleRef.current)
      }}>放大</button>
    </div>
    <div id="container"> </div>

  </>;
}

const rootDom = document.getElementById("app");
const root = createRoot(rootDom);
root.render(<App />);
