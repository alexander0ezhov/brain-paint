export const canvas = <HTMLCanvasElement>document.getElementById("canvas");
export const ctx = canvas.getContext("2d");
export const FPS = 60 as const;
export const FPS_TIMEOUT = 1000 / FPS;
export const PIXEL = 15;
export const LINEWIDTH = 5;
export const clearButton = <HTMLButtonElement>document.getElementById("clear");
export const trainButton = <HTMLButtonElement>document.getElementById("train");
export const recognizeButton = <HTMLButtonElement>(
  document.getElementById("recognize")
);

// export const resizeCanvas = () => {
//   const minWidth = visualViewport.width - 48;
//   const minHeight = visualViewport.height - 78;
//   // canvas.style.width = `${minWidth}px`;
//   // canvas.style.height = `${minHeight}px`;
// };
