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
  const visual: Coor = { x: 100, y: 100, z: 300 };
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
      const xVal =
        ((x - visual.x) * visual.z) / (visual.z - z) + visual.x + offsetX;
      const yVal =
        ((y - visual.y) * visual.z) / (visual.z - z) + visual.y + offsetY;
      console.log(xVal, yVal);
      return {
        x: xVal,
        y: yVal,
      };
    };
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();

    let point;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    // 绘制矩形ABCD
    ctx.beginPath();
    point = transformCoordinatePoint.apply(null, pointMap.A);
    ctx.moveTo(point.x, point.y);
    point = transformCoordinatePoint.apply(null, pointMap.B);
    ctx.lineTo(point.x, point.y);
    point = transformCoordinatePoint.apply(null, pointMap.C);
    ctx.lineTo(point.x, point.y);
    point = transformCoordinatePoint.apply(null, pointMap.D);
    ctx.lineTo(point.x, point.y);
    ctx.closePath();
    ctx.stroke();
    // 绘制矩形EFGH
    ctx.beginPath();
    point = transformCoordinatePoint.apply(null, pointMap.E);
    ctx.moveTo(point.x, point.y);
    point = transformCoordinatePoint.apply(null, pointMap.F);
    ctx.lineTo(point.x, point.y);
    point = transformCoordinatePoint.apply(null, pointMap.G);
    ctx.lineTo(point.x, point.y);
    point = transformCoordinatePoint.apply(null, pointMap.H);
    ctx.lineTo(point.x, point.y);
    ctx.closePath();
    ctx.stroke();
    // 绘制直线AE
    ctx.beginPath();
    point = transformCoordinatePoint.apply(null, pointMap.A);
    ctx.moveTo(point.x, point.y);
    point = transformCoordinatePoint.apply(null, pointMap.E);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    ctx.closePath();
    // 绘制直线BF
    ctx.beginPath();
    point = transformCoordinatePoint.apply(null, pointMap.B);
    ctx.moveTo(point.x, point.y);
    point = transformCoordinatePoint.apply(null, pointMap.F);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    ctx.closePath();
    // 绘制直线CD
    ctx.beginPath();
    point = transformCoordinatePoint.apply(null, pointMap.C);
    ctx.moveTo(point.x, point.y);
    point = transformCoordinatePoint.apply(null, pointMap.G);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    ctx.closePath();
    // 绘制直线DH
    ctx.beginPath();
    point = transformCoordinatePoint.apply(null, pointMap.D);
    ctx.moveTo(point.x, point.y);
    point = transformCoordinatePoint.apply(null, pointMap.H);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    ctx.closePath();
  }, []);
  return (
    <canvas
      id="canvas"
      height={canvasHeight}
      width={canvasWidth}
      style={{ border: "1px solid red" }}
      ref={canvasRef}
    ></canvas>
  );
}

const rootDom = document.getElementById("app");
const root = createRoot(rootDom);
root.render(<App />);
