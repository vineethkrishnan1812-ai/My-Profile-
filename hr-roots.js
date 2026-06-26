const canvas = document.createElement("canvas");
canvas.id = "root-canvas";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "red";
  ctx.lineWidth = 4;

  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 200);
  ctx.lineTo(canvas.width / 2, 500);
  ctx.stroke();

  requestAnimationFrame(draw);
}

draw();
