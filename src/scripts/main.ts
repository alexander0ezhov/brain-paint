import * as brain from "brain.js";
import { canvas, ctx, PIXEL } from "./utils/canvas";
import { calculate, clearCanvas } from "./utils/draw";
import { INeuralNetworkDatum } from "brain.js/dist/src/neural-network";

let isMouseDown = false;

type InputType = {};
type OutputType = {};

let train_data: Array<
  INeuralNetworkDatum<Partial<InputType>, Partial<OutputType>>
> = [];

const onClientMove = (offsetX: number, offsetY: number) => {
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
};

const onMouseDown = (): void => {
  isMouseDown = true;
  ctx.beginPath();
};
const onMouseMove = (e: MouseEvent): void => {
  onClientMove(e.offsetX, e.offsetY);
};

const onTouchMove = (e: TouchEvent) => {
  const touch = e.touches[0];
  const mouseEvent = new MouseEvent("mousemove", {
    clientX: touch.clientX,
    clientY: touch.clientY,
  });
  canvas.dispatchEvent(mouseEvent);
};

const onMouseUp = (): void => {
  isMouseDown = false;
};

const onKeyDown = (event: KeyboardEvent) => {
  switch (event.key.toLowerCase()) {
    case "r": {
      const netWork = new brain.NeuralNetwork();
      netWork.train(train_data, { log: true });
      const result = brain.likely(calculate(), netWork);
      alert(result);
      break;
    }
    case "d": {
      const calculation = calculate();
      const answer = prompt("Что это?");
      if (answer) {
        train_data.push({
          input: calculation,
          output: { [answer]: 1 },
        });
      }
      setTimeout(clearCanvas, 500);
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
  document.addEventListener("keypress", onKeyDown);
};
