// =========================================
// THREE SCENE V3
// PART A
// Scene + Camera + Galaxy Stars
// =========================================

const scene = new THREE.Scene();

scene.fog = new THREE.FogExp2(
0x02030d,
0.002
);

const camera = new THREE.PerspectiveCamera(

60,

window.innerWidth/window.innerHeight,

0.1,

2000

);

camera.position.z = 120;

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

camera.aspect=

window.innerWidth/

window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(

window.innerWidth,

window.innerHeight

);

});

// =========================================
// GALAXY STARS
// =========================================

const STAR_COUNT = 12000;

const starGeometry =
new THREE.BufferGeometry();

const starVertices=[];

for(let i=0;i<STAR_COUNT;i++){

starVertices.push(

(Math.random()-.5)*2500,

(Math.random()-.5)*1800,

(Math.random()-.5)*2500

);

}

starGeometry.setAttribute(

"position",

new THREE.Float32BufferAttribute(

starVertices,

3

)

);

const starMaterial=

new THREE.PointsMaterial({

color:0xffffff,

size:1,

transparent:true,

opacity:.85

});

const stars=

new THREE.Points(

starGeometry,

starMaterial

);

scene.add(stars);

// =========================================
// BRIGHT STAR CLUSTERS
// =========================================

const clusterGeometry=
new THREE.BufferGeometry();

const cluster=[];

for(let i=0;i<600;i++){

cluster.push(

(Math.random()-.5)*900,

(Math.random()-.5)*700,

(Math.random()-.5)*900

);

}

clusterGeometry.setAttribute(

"position",

new THREE.Float32BufferAttribute(

cluster,

3

)

);

const clusterMaterial=

new THREE.PointsMaterial({

color:0x7dd3ff,

size:2.4,

transparent:true,

opacity:.95

});

const brightStars=

new THREE.Points(

clusterGeometry,

clusterMaterial

);

scene.add(brightStars);
// =========================================
// THREE SCENE V3
// PART B
// Nebula + Floating Glass Objects
// =========================================

// ---------- NEBULA ----------

const nebulaGroup = new THREE.Group();

for(let i=0;i<8;i++){

const geo = new THREE.SphereGeometry(

35+Math.random()*25,

32,

32

);

const mat = new THREE.MeshBasicMaterial({

color: i%2===0 ? 0x5a8cff : 0xa855f7,

transparent:true,

opacity:0.06,

depthWrite:false

});

const cloud = new THREE.Mesh(

geo,

mat

);

cloud.position.set(

(Math.random()-.5)*600,

(Math.random()-.5)*350,

(Math.random()-.5)*400

);

cloud.scale.setScalar(

2+Math.random()*2

);

nebulaGroup.add(cloud);

}

scene.add(nebulaGroup);


// =========================================
// FLOATING GLASS BLOBS
// =========================================

const blobGroup = new THREE.Group();

const blobMaterial = new THREE.MeshPhysicalMaterial({

color:0x88bbff,

transmission:1,

transparent:true,

opacity:.35,

roughness:.05,

metalness:.2,

clearcoat:1,

clearcoatRoughness:0,

ior:1.45

});

for(let i=0;i<6;i++){

const blob = new THREE.Mesh(

new THREE.IcosahedronGeometry(

10+Math.random()*6,

5

),

blobMaterial.clone()

);

blob.position.set(

(Math.random()-.5)*180,

(Math.random()-.5)*120,

(Math.random()-.5)*80

);

blob.userData={

speed:.002+Math.random()*.003,

offset:Math.random()*Math.PI*2

};

blobGroup.add(blob);

}

scene.add(blobGroup);


// =========================================
// LIGHTS
// =========================================

const ambientLight =

new THREE.AmbientLight(

0xffffff,

1.2

);

scene.add(ambientLight);

const pointLight =

new THREE.PointLight(

0x6ea8ff,

2,

500

);

pointLight.position.set(

80,

100,

120

);

scene.add(pointLight);
// =========================================
// THREE SCENE V3
// PART C
// HR ROOT NETWORK + RED DATA FLOW
// =========================================

// ---------- ROOT NETWORK ----------

const rootGroup = new THREE.Group();

const rootMaterial = new THREE.LineBasicMaterial({

color:0x5ad1ff,

transparent:true,

opacity:.15

});

const pulseMaterial = new THREE.MeshBasicMaterial({

color:0xff3b5c

});

const pulses=[];

function createBranch(x,y,z,length,angle,depth){

if(depth<=0) return;

const x2=x+Math.cos(angle)*length;

const y2=y-Math.sin(angle)*length;

const z2=z+(Math.random()-.5)*10;

const geometry=new THREE.BufferGeometry().setFromPoints([

new THREE.Vector3(x,y,z),

new THREE.Vector3(x2,y2,z2)

]);

const line=new THREE.Line(

geometry,

rootMaterial

);

rootGroup.add(line);

// RED PULSE

const pulse=new THREE.Mesh(

new THREE.SphereGeometry(.8,12,12),

pulseMaterial

);

pulse.position.set(x,y,z);

pulse.userData={

start:new THREE.Vector3(x,y,z),

end:new THREE.Vector3(x2,y2,z2),

progress:Math.random()

};

pulses.push(pulse);

rootGroup.add(pulse);

// LEFT BRANCH

createBranch(

x2,

y2,

z2,

length*.75,

angle-.45,

depth-1

);

// RIGHT BRANCH

createBranch(

x2,

y2,

z2,

length*.75,

angle+.45,

depth-1

);

}

createBranch(

0,

-60,

0,

24,

Math.PI/2,

7

);

scene.add(rootGroup);


// =========================================
// ROOT ANIMATION
// =========================================

function animateRoots(){

pulses.forEach(p=>{

p.userData.progress+=0.006;

if(p.userData.progress>1){

p.userData.progress=0;

}

p.position.lerpVectors(

p.userData.start,

p.userData.end,

p.userData.progress

);

});

}
// =========================================
// THREE SCENE V3
// PART D
// Animation Loop + Mouse Parallax
// =========================================

// Mouse movement

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove",(e)=>{

mouseX = (e.clientX/window.innerWidth - 0.5) * 2;

mouseY = (e.clientY/window.innerHeight - 0.5) * 2;

});


// =========================================
// ANIMATE
// =========================================

const clock = new THREE.Clock();

function animate(){

requestAnimationFrame(animate);

const t = clock.getElapsedTime();


// Galaxy Rotation

stars.rotation.y += 0.00008;

brightStars.rotation.y += 0.00015;


// Nebula Motion

nebulaGroup.children.forEach((cloud,i)=>{

cloud.rotation.y += 0.0002*(i+1);

cloud.position.y += Math.sin(t+i)*0.01;

});


// Floating Glass Objects

blobGroup.children.forEach((blob,i)=>{

blob.rotation.x += 0.002;

blob.rotation.y += 0.003;

blob.position.y += Math.sin(t+blob.userData.offset)*0.02;

blob.position.x += Math.cos(t+blob.userData.offset)*0.01;

});


// HR Root Animation

animateRoots();


// Camera Parallax

camera.position.x += (mouseX*12-camera.position.x)*0.04;

camera.position.y += (-mouseY*8-camera.position.y)*0.04;

camera.lookAt(scene.position);


// Render

renderer.render(scene,camera);

}

animate();
