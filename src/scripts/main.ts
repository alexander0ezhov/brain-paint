import { canvas, ctx, PIXEL } from "./utils/canvas";
import { calculate, clearCanvas, drawGrid } from "./utils/draw";

let isMouseDown = false;

const onMove = (offsetX:number, offsetY:number) => {
if (isMouseDown) {
    ctx.fillStyle = "red";
    ctx.strokeStyle = "red";
    ctx.lineWidth = PIXEL;

    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(offsetX, offsetY, PIXEL / 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
  }
}

const onMouseDown = (): void => {
  isMouseDown = true;
  ctx.beginPath();
};
const onMouseMove = (e: MouseEvent): void => {
  
};

const onTouchMove = (e: TouchEvent) => {}

const onMouseUp = (): void => {
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
      calculate();
      // drawGrid();
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
  canvas.addEventListener("touchstart", onMouseDown);
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("touchmove", onTouchMove);
  canvas.addEventListener("mouseup", onMouseUp);
  canvas.addEventListener("touchcancel", onMouseUp);
  document.addEventListener("keydown", onKeyDown);
};
