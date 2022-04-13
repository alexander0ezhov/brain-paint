export const canvas = <HTMLCanvasElement>document.getElementById("canvas");
export const ctx = canvas.getContext("2d");
export const FPS = 60 as const;
export const FPS_TIMEOUT = 1000 / FPS