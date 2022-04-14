import { canvas, ctx, PIXEL } from "./utils/canvas";
import { clearCanvas, drawGrid } from "./utils/draw";

let isMouseDown = false;

const onMouseDown = (e: MouseEvent): void => {
  isMouseDown = true;
  ctx.beginPath();
};
const onMouseMove = (e: MouseEvent): void => {
  if (isMouseDown) {
    ctx.fillStyle = "red";
    ctx.strokeStyle = "red";
    ctx.lineWidth = PIXEL;

    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(e.offsetX, e.offsetY, PIXEL / 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
  }
};

const onMouseUp = () => {
  isMouseDown = false;
};

const onKeyDown = (event: KeyboardEvent) => {
  switch (event.key.toLowerCase()) {
    case "s": {
      console.log("save");
      break;
    }
    case "r": {
      console.log("recognize");
      break;
    }
    case "d": {
      drawGrid();
      break;
    }
    case "c": {
      clearCanvas();
      break;
    }
    default:
      break;
  }
};

export default () => {
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mouseup", onMouseUp);
  document.addEventListener("keydown", onKeyDown);
};
