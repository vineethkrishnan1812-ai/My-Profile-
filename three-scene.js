// ==========================
// THREE.JS SCENE SETUP
// ==========================

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
60,
window.innerWidth/window.innerHeight,
0.1,
1000
);

camera.position.z = 80;

const renderer = new THREE.WebGLRenderer({

canvas:document.getElementById("bg-canvas"),

alpha:true,

antialias:true

});

renderer.setSize(

window.innerWidth,

window.innerHeight

);

renderer.setPixelRatio(

Math.min(window.devicePixelRatio,2)

);

window.addEventListener("resize",()=>{

camera.aspect=window.innerWidth/window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(

window.innerWidth,

window.innerHeight

);

});
