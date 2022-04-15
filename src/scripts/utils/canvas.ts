export const canvas = <HTMLCanvasElement>document.getElementById("canvas");
export const ctx = canvas.getContext("2d");
export const FPS = 60 as const;
export const FPS_TIMEOUT = 1000 / FPS;
export const PIXEL = 10;
export const LINEWIDTH = 5;
export const clearButton = <HTMLButtonElement>document.getElementById("clear");
export const clearStorageButton = <HTMLButtonElement>(
  document.getElementById("clear_storage")
);
export const trainButton = <HTMLButtonElement>document.getElementById("train");
export const recognizeButton = <HTMLButtonElement>(
  document.getElementById("recognize")
);
export const loader = <HTMLDivElement>document.getElementById("loader");

export const setIsLoading = (isLoading: boolean = false): void => {
  isLoading
    ? loader.classList.add("visible")
    : loader.classList.remove("visible");
};

export const resizeCanvas = () => {
  const minWidth = visualViewport.width;
  const minHeight = visualViewport.height;
  const minSize = Math.min(minWidth, minHeight, 600) - 48;
  const styleSize = `calc(${minSize}px)`;
  canvas.style.width = styleSize;
  canvas.style.height = styleSize;
  return minSize / canvas.height;
};
