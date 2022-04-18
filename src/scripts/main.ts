// @ts-ignore
import { INeuralNetworkDatum } from "brain.js/dist/src/neural-network";
import {
  canvas,
  clearButton,
  saveButton,
  clearStorageButton,
  ctx,
  LINEWIDTH,
  recognizeButton,
  resizeCanvas,
  setIsLoading,
  trainButton,
} from "./utils/canvas";
import { calculate, clearCanvas } from "./utils/draw";

const BrainWorker = new Worker(new URL("./worker.js", import.meta.url));

let isMouseDown = false;
const TrainStorageKey = "train_data" as const;
let zoom: number = 1;

type InputType = {};
type OutputType = {};

let train_data: Array<
  INeuralNetworkDatum<Partial<InputType>, Partial<OutputType>>
> = [];

const onClientMove = (offsetX: number, offsetY: number) => {
  if (isMouseDown) {
    const x = offsetX / zoom;
    const y = offsetY / zoom;
    ctx.fillStyle = "red";
    ctx.strokeStyle = "red";
    ctx.lineWidth = LINEWIDTH;

    ctx.lineTo(x, y);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, LINEWIDTH / 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x, y);
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
  e.stopPropagation();
  e.preventDefault();
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

const onClear = () => {
  clearCanvas();
};

const onSave = () => {
  const answer = prompt("Что это?");
  if (!answer) return;
  setIsLoading(true);
  const calculation = calculate();
  train_data.push({
    input: calculation,
    output: { [answer]: 1 },
  });
  localStorage.setItem(TrainStorageKey, JSON.stringify(train_data));
  setTimeout(() => {
    setIsLoading(false);
    clearCanvas();
  }, 500);
};

const onTrain = () => {
  if (!train_data.length) {
    alert("Нет тренировочных данных");
    return;
  }
  setIsLoading(true);
  BrainWorker.postMessage({
    type: "TRAIN",
    train_data,
  });
};

const onRecognize = async () => {
  await setIsLoading(true);
  BrainWorker.postMessage({
    type: "RECOGNIZE",
    calculation: calculate(),
  });
};

const onKeyDown = (e: KeyboardEvent) => {
  switch (e.key.toLowerCase()) {
    case "r":
    case "к": {
      onRecognize();
      break;
    }
    case "t":
    case "е": {
      onTrain();
      break;
    }
    case "c":
    case "с": {
      onClear();
      break;
    }
    default:
      break;
  }
};

export default () => {
  zoom = resizeCanvas();
  const storageData = localStorage.getItem(TrainStorageKey);
  if (storageData) train_data = JSON.parse(storageData);
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("touchstart", onMouseDown);
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("touchmove", onTouchMove);
  canvas.addEventListener("mouseup", onMouseUp);
  canvas.addEventListener("touchcancel", onMouseUp);
  document.addEventListener("keypress", onKeyDown);
  clearButton.onclick = onClear;
  saveButton.onclick = onSave;
  recognizeButton.onclick = onRecognize;
  trainButton.onclick = onTrain;
  clearStorageButton.onclick = () => {
    train_data = [];
    BrainWorker.postMessage({ type: "CLEAR" });
    localStorage.setItem(TrainStorageKey, JSON.stringify([]));
  };
  BrainWorker.onmessage = ({ data }) => {
    switch (data.type) {
      case "RECOGNIZE":
        setIsLoading(false);
        alert(data.result);
        break;
      case "TRAIN":
        setIsLoading(false);
        alert("Тренировка выполнена");
        break;
    }
  };
};
