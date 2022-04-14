import {canvas, ctx, PIXEL} from "./canvas";

export const drawLine = (x1:number,  y1:number, x2:number, y2:number, color="gray"):void=>{
    ctx.beginPath()
    ctx.strokeStyle = color;
    ctx.lineJoin = 'miter';
    ctx.lineWidth = 1;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

export const drawCell = (x:number,y:number,w:number,h:number):void=> {
    ctx.fillStyle = 'blue';
    ctx.strokeStyle = 'blue';
    ctx.lineJoin = 'miter';
    ctx.lineWidth = 1;
    ctx.rect(x, y, w, h);
    ctx.fill();
}

export const clearCanvas = ():void=>{
    ctx.clearRect(0,0,canvas.width, canvas.height)
}

export const drawGrid = ():void => {
    const w = canvas.width;
    const h = canvas.height;
    const p = w / PIXEL;

    const xStep = w / p;
    const yStep = h / p;

    for( let x = 0; x < w; x += xStep )
    {
        drawLine(x, 0, x, h);
    }
    for( let y = 0; y < h; y += yStep )
    {
        drawLine(0, y, w, y);
    }
}