import { canvas, ctx, PIXEL } from "./canvas";

const w = canvas.width;
const h = canvas.height;
const steps: number = w / PIXEL;
const xStep: number = w / steps;
const yStep: number = h / steps;

export const drawLine = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color = "gray"
): void => {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineJoin = "miter";
  ctx.lineWidth = 1;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
};

export const drawCell = (x: number, y: number, w: number, h: number): void => {
  ctx.fillStyle = "blue";
  ctx.strokeStyle = "blue";
  ctx.lineJoin = "miter";
  ctx.lineWidth = 1;
  ctx.rect(x, y, w, h);
  ctx.fill();
};

export const clearCanvas = (): void => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

export const calculate = () => {
  const area: number[] = [];
  let drawArea = [];
  for (let x = 0; x < w; x += xStep) {
    for (let y = 0; y < h; y += yStep) {
      const imageData = ctx.getImageData(x, y, xStep, yStep).data;
      const nonEmpty: boolean = imageData.some((item) => item);
      if (nonEmpty) drawArea.push([x, y, xStep, yStep]);
      area.push(Number(nonEmpty));
    }
    for (let idx in drawArea) {
      drawCell(
        drawArea[idx][0],
        drawArea[idx][1],
        drawArea[idx][2],
        drawArea[idx][3]
      );
    }
  }
  return area;
};
