const rootCanvas = document.createElement("canvas");
rootCanvas.id = "root-canvas";

document.body.appendChild(rootCanvas);

const ctx = rootCanvas.getContext("2d");

function resizeRootCanvas(){
    rootCanvas.width = window.innerWidth;
    rootCanvas.height = window.innerHeight;
}

resizeRootCanvas();
window.addEventListener("resize", resizeRootCanvas);
