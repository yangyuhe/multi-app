import { Graph, Model, Options, Shape, ToolsView } from "@antv/x6";
import { createRoot } from "react-dom/client";
import "./index.css";
import * as React from "react";

class TooltipTool extends ToolsView.ToolItem {
  private knob: HTMLDivElement;

  render() {
    if (!this.knob) {
      this.knob = ToolsView.createElement("div", false) as HTMLDivElement;
      this.knob.style.position = "absolute";
      this.knob.style.background = "black";
      this.knob.style.padding = "5px";
      this.knob.style.color = "white";
      this.knob.style.borderRadius = "8px";
      this.knob.innerHTML = this.options.tooltip;
      this.knob.style.display = "none";
      this.container.appendChild(this.knob);
    }
    return this;
  }

  private toggleTooltip(visible: boolean) {
    if (this.knob) {
      this.knob.style.display = visible ? "block" : "none";
    }
  }

  private onMosueEnter({ e }: { e: MouseEvent }) {
    this.updatePosition(e);
    this.toggleTooltip(true);
  }

  private onMouseLeave() {
    this.updatePosition();
    this.toggleTooltip(false);
  }

  private onMouseMove() {
    this.updatePosition();
    this.toggleTooltip(false);
  }

  delegateEvents() {
    this.cellView.on("cell:mouseenter", this.onMosueEnter, this);
    this.cellView.on("cell:mouseleave", this.onMouseLeave, this);
    this.cellView.on("cell:mousemove", this.onMouseMove, this);
    return super.delegateEvents();
  }

  private updatePosition(e?: MouseEvent) {
    const style = this.knob.style;
    if (e) {
      const p = this.graph.clientToGraph(e.clientX, e.clientY);
      style.display = "block";
      style.left = `${p.x}px`;
      style.top = `${p.y}px`;
    } else {
      style.display = "none";
      style.left = "-1000px";
      style.top = "-1000px";
    }
  }

  protected onRemove() {
    this.toggleTooltip(false);
    this.cellView.off("cell:mouseenter", this.onMosueEnter, this);
    this.cellView.off("cell:mouseleave", this.onMouseLeave, this);
    this.cellView.off("cell:mousemove", this.onMouseMove, this);
  }
}

TooltipTool.config({
  tagName: "div",
  isSVGElement: false,
});
Graph.registerEdgeTool("tooltip", TooltipTool, true);
function getNodePostion(width, height, paddingX, paddingY) {
  let x1 = paddingX,
    y1 = paddingY;
  let res = [[x1, y1]];
  for (let i = 2; i <= 4; i++) {
    res.push([x1 + (i - 1) * ((width - paddingX * 2) / 3), y1]);
  }
  for (let i = 5; i <= 8; i++) {
    res.push([res[i - 5][0], y1 + height - paddingY * 2]);
  }
  let vertices = {};

  vertices["0,2"] = [
    [res[0][0], y1 - 100],
    [res[2][0], y1 - 100],
  ];

  vertices["0,3"] = [
    [res[0][0], y1 - 120],
    [res[3][0], y1 - 120],
  ];

  vertices["1,3"] = [
    [res[1][0], y1 - 80],
    [res[3][0], y1 - 80],
  ];

  vertices["4,6"] = [
    [res[4][0], res[4][1] + 80],
    [res[6][0], res[4][1] + 80],
  ];

  vertices["4,7"] = [
    [res[4][0], res[4][1] + 120],
    [res[7][0], res[4][1] + 120],
  ];

  vertices["5,7"] = [
    [res[5][0], res[4][1] + 100],
    [res[7][0], res[4][1] + 100],
  ];

  return { nodePos: res, edgePos: vertices };
}

const size = 68;
const canvasHeight = 520;
const canvasWidth = 1182;
Shape.HTML.register({
  shape: "custom-html",
  width: size,
  height: size,
  effect: ["data"],
  html(cell) {
    const div = document.createElement("div");
    div.style.border = "2px solid #8FBCFF";
    div.style.height = "68px";
    div.style.width = "68px";
    div.style.display = "flex";
    div.style.flexDirection = "column";
    div.style.alignItems = "center";
    div.style.background = "#D9EAFF";
    div.style.borderRadius = "8px";

    const icon = document.createElement("div");
    icon.style.height = "22px";
    icon.style.width = "22px";
    icon.style.border = "1px solid red";
    icon.style.marginTop = "auto";
    div.appendChild(icon);

    const des = document.createElement("div");
    des.innerHTML = cell.getData().label;
    des.style.color = "#0F172A";
    des.style.marginBottom = "auto";
    div.appendChild(des);

    return div;
  },
});

function App() {
  React.useEffect(() => {
    const data: Model.FromJSONData = {
      nodes: [],
      edges: [],
    };
    const keyPoints = [
      [1, 3],
      [1, 2],
      [1, 4],
      [2, 3, -1],
      [2, 4],
      [3, 4],
      [1, 5],
      [1, 6],
      [1, 7],
      [1, 8],
      [5, 6],
      [5, 7],
      [5, 8],
      [6, 7],
      [6, 8],
      [7, 8],
      [2, 5],
      [2, 6],
      [2, 7],
      [3, 5],
      [3, 6],
      [3, 7],
      [3, 8],
      [4, 5],
      [4, 6],
      [4, 7],
      [4, 8],
    ];
    const { nodePos, edgePos } = getNodePostion(
      canvasWidth,
      canvasHeight,
      245,
      154
    );
    console.log(nodePos, edgePos);

    for (let i = 1; i <= 8; i++) {
      data.nodes!.push({
        id: `${i}`,
        shape: "custom-html",
        position: {
          x: nodePos[i - 1][0] - size / 2,
          y: nodePos[i - 1][1] - size / 2,
        },
        label: i,
        data: {
          label: "GPU" + i,
        },
      });
    }

    for (let i = 0; i < keyPoints.length; i++) {
      const presetPos =
        edgePos[keyPoints[i][0] - 1 + "," + (keyPoints[i][1] - 1)] ||
        edgePos[keyPoints[i][1] - 1 + "," + (keyPoints[i][0] - 1)];

      data.edges!.push({
        source: `${keyPoints[i][0]}`,
        target: `${keyPoints[i][1]}`,
        attrs: {
          line: {
            stroke: "#10B981",
            strokeWidth: 1,
            sourceMarker: "block",
            targetMarker: "block",
          },
        },
        tools: [
          {
            name: "tooltip",
            args: {
              tooltip: "<h1>Tooltip Content</h1><br/><span>wrong</span>",
            },
          },
        ],
        vertices: presetPos || [],
        defaultLabel: {
          markup: [
            {
              tagName: "rect",
              selector: "body",
            },
            {
              tagName: "text",
              selector: "label",
            },
          ],
          attrs: {
            label: {
              fill: "white",
              fontSize: 10,
              textAnchor: "middle",
              textVerticalAnchor: "middle",
              pointerEvents: "none",
            },
            body: {
              ref: "label",
              fill: "#10B981",
              rx: 3,
              ry: 3,
              refWidth: "100%",
              refWidth2: 10,
              refHeight: "100%",
              refHeight2: 2,
              refX: -5,
              refY: -1,
            },
          },
          position: {
            distance: 0.3,
          },
        },
        labels: [
          {
            attrs: {
              label: {
                text: keyPoints[i][2] === -1 ? "异常" : "176.69",
              },
            },
            position: {
              distance: presetPos ? 100 : 45,
              options: {
                keepGradient: true,
                ensureLegibility: true,
              },
            },
          },
          {
            attrs: {
              label: {
                text: keyPoints[i][2] === -1 ? "异常" : "176.69",
              },
            },
            position: {
              distance: presetPos ? -100 : -45,
              options: {
                keepGradient: true,
                ensureLegibility: true,
              },
            },
          },
        ],
      });
    }

    const graph = new Graph({
      container: document.getElementById("container")!,
      height: canvasHeight,
      width: canvasWidth,
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
