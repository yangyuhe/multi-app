import { createRoot } from "react-dom/client";
import * as React from "react";

interface Coor {
  x: number;
  y: number;
  z: number;
}
function App() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const canvasWidth = 500;
  const canvasHeight = 500;
  const visual: Coor = { x: 0, y: 0, z: 300 };
  const pointMap = {
    A: [-50, 50, 50],
    B: [-50, 50, -50],
    C: [50, 50, -50],
    D: [50, 50, 50],
    E: [-50, -50, 50],
    F: [-50, -50, -50],
    G: [50, -50, -50],
    H: [50, -50, 50],
  };

  React.useEffect(() => {
    const transformCoordinatePoint = (
      x: number,
      y: number,
      z: number,
      offsetX = canvasWidth / 2,
      offsetY = canvasHeight / 2
    ) => {
      return {
        x: ((x - visual.x) * visual.z) / (visual.z - z) + offsetX,
        y: ((y - visual.y) * visual.z) / (visual.z - z) + offsetY,
      };
    };
    const ctx = canvasRef.current.getContext("2d");
    let point;
    // ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    // 绘制矩形ABCD
    ctx.beginPath();
    point = transformCoordinatePoint.apply(null, ...pointMap.A);
    ctx.moveTo(point.x, point.y);
    point = transformCoordinatePoint(...pointMap.B);
    ctx.lineTo(point.x, point.y);
    point = transformCoordinatePoint(...pointMap.C);
    ctx.lineTo(point.x, point.y);
    point = transformCoordinatePoint(...pointMap.D);
    ctx.lineTo(point.x, point.y);
    ctx.closePath();
    ctx.stroke();
    // 绘制矩形EFGH
    ctx.beginPath();
    point = transformCoordinatePoint(...pointMap.E);
    ctx.moveTo(point.x, point.y);
    point = transformCoordinatePoint(...pointMap.F);
    ctx.lineTo(point.x, point.y);
    point = transformCoordinatePoint(...pointMap.G);
    ctx.lineTo(point.x, point.y);
    point = transformCoordinatePoint(...pointMap.H);
    ctx.lineTo(point.x, point.y);
    ctx.closePath();
    ctx.stroke();
    // 绘制直线AE
    ctx.beginPath();
    point = transformCoordinatePoint(...pointMap.A);
    ctx.moveTo(point.x, point.y);
    point = transformCoordinatePoint(...pointMap.E);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    ctx.closePath();
    // 绘制直线BF
    ctx.beginPath();
    point = transformCoordinatePoint(...pointMap.B);
    ctx.moveTo(point.x, point.y);
    point = transformCoordinatePoint(...pointMap.F);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    ctx.closePath();
    // 绘制直线CD
    ctx.beginPath();
    point = transformCoordinatePoint(...pointMap.C);
    ctx.moveTo(point.x, point.y);
    point = transformCoordinatePoint(...pointMap.G);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    ctx.closePath();
    // 绘制直线DH
    ctx.beginPath();
    point = transformCoordinatePoint(...pointMap.D);
    ctx.moveTo(point.x, point.y);
    point = transformCoordinatePoint(...pointMap.H);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    ctx.closePath();
  }, []);
  return (
    <canvas
      id="canvas"
      style={{ width: "500px", height: "500px" }}
      ref={canvasRef}
    ></canvas>
  );
}

const rootDom = document.getElementById("app");
const root = createRoot(rootDom);
root.render(<App />);
