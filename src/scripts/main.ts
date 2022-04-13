import {canvas, ctx, FPS_TIMEOUT} from "./utils/canvas";

export default ()=>{
    const draw = ()=>{
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        setTimeout(requestAnimationFrame.bind(this, draw), FPS_TIMEOUT)
    }
}