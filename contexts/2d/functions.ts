export { draw_rectangle_context_2D } from "./rectangle"
export { draw_selection_context_2D } from "./selection";

export const applyBackground = (background: string | CanvasGradient) => {
  background
}

export const clear_window_context_2D = (context: CanvasRenderingContext2D) => {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height)
}

export const save_window_context_2D = (context: CanvasRenderingContext2D) => {
  context.save()
}

export const restore_window_context_2D = (context: CanvasRenderingContext2D) => {
  context.restore()
}

export const translate_window_context_2D = (context: CanvasRenderingContext2D, options: any) => {
  context.translate(options.x, options.y)
}

export const grid_make_contest_2D = (context: CanvasRenderingContext2D, options: any) => {
  context.beginPath();
  context.fillStyle = options.background;
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  context.closePath();

  for (let y = 0; y < context.canvas.height; y += options.grid) {
    context.beginPath();
    context.lineWidth = 1;
    context.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    context.moveTo(-context.canvas.width, y);
    context.lineTo(context.canvas.width, y);
    context.stroke();
    context.closePath()
  }

  for (let x = 0; x < context.canvas.width; x += options.grid) {
    context.beginPath();
    context.lineWidth = 1;
    context.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    context.moveTo(x, -context.canvas.height);
    context.lineTo(x, context.canvas.height);
    context.stroke();
    context.closePath()
  }
}
