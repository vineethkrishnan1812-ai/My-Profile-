const rootCanvas = document.createElement("canvas");
rootCanvas.id = "root-canvas";
document.body.appendChild(rootCanvas);

const ctx = rootCanvas.getContext("2d");

function resizeCanvas() {
    rootCanvas.width = window.innerWidth;
    rootCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Root starting point (under profile)
const startX = window.innerWidth * 0.68;
const startY = window.innerHeight * 0.60;

function drawBranch(x, y, angle, length, depth) {

    if (depth <= 0) return;

    const x2 = x + Math.cos(angle) * length;
    const y2 = y + Math.sin(angle) * length;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);

    ctx.strokeStyle = "rgba(120,180,255,0.45)";
    ctx.lineWidth = depth * 0.5;
    ctx.stroke();

    drawBranch(x2, y2, angle - 0.35, length * 0.75, depth - 1);
    drawBranch(x2, y2, angle + 0.35, length * 0.75, depth - 1);

}

function animateRoots() {

    ctx.clearRect(0, 0, rootCanvas.width, rootCanvas.height);

    drawBranch(startX, startY, Math.PI / 2, 80, 7);

    requestAnimationFrame(animateRoots);

}

animateRoots();
