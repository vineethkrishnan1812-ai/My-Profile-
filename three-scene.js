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
// ======================================
// PART 4B - 3D HR NETWORK
// ======================================

const nodeCount = 120;

const positions = [];
const linePositions = [];

for(let i = 0; i < nodeCount; i++){

    positions.push(
        (Math.random()-0.5)*200,
        (Math.random()-0.5)*120,
        (Math.random()-0.5)*180
    );

}

const nodeGeometry = new THREE.BufferGeometry();

nodeGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions,3)
);

const nodeMaterial = new THREE.PointsMaterial({

    color:0xffffff,

    size:0.6,

    transparent:true,

    opacity:.85

});

const nodes = new THREE.Points(

    nodeGeometry,

    nodeMaterial

);

scene.add(nodes);


// Create network lines

for(let i=0;i<nodeCount;i++){

    for(let j=i+1;j<nodeCount;j++){

        const ax=positions[i*3];
        const ay=positions[i*3+1];
        const az=positions[i*3+2];

        const bx=positions[j*3];
        const by=positions[j*3+1];
        const bz=positions[j*3+2];

        const dx=ax-bx;
        const dy=ay-by;
        const dz=az-bz;

        const dist=Math.sqrt(dx*dx+dy*dy+dz*dz);

        if(dist<12){

            linePositions.push(ax,ay,az);
            linePositions.push(bx,by,bz);

        }

    }

}

const lineGeometry=new THREE.BufferGeometry();

lineGeometry.setAttribute(

    "position",

    new THREE.Float32BufferAttribute(linePositions,3)

);

const lineMaterial = new THREE.LineBasicMaterial({

    color:0x8b5cf6,

    transparent:true,

    opacity:.015

});

const lines=new THREE.LineSegments(

    lineGeometry,

    lineMaterial

);

scene.add(lines);


// Animation

function animate3D(){

    requestAnimationFrame(animate3D);

    nodes.rotation.y+=0.0002;

    nodes.rotation.x+=0.0003;

    lines.rotation.y+=0.0002;

    renderer.render(scene,camera);

}

animate3D()
