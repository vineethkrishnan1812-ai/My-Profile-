// =============================
// 3D HR NETWORK
// =============================

const canvas = document.getElementById("bg-canvas");

const ctx = canvas.getContext("2d");

function resize(){

canvas.width=window.innerWidth;

canvas.height=window.innerHeight;

}

resize();

window.addEventListener("resize",resize);

const particles=[];

const total=180;

class Particle{

constructor(){

this.x=Math.random()*canvas.width;

this.y=Math.random()*canvas.height;

this.vx=(Math.random()-0.5)*0.5;

this.vy=(Math.random()-0.5)*0.5;

this.size=Math.random()*3+1;

}

move(){

this.x+=this.vx;

this.y+=this.vy;

if(this.x<0||this.x>canvas.width)this.vx*=-1;

if(this.y<0||this.y>canvas.height)this.vy*=-1;

}

draw(){

ctx.beginPath();

ctx.arc(this.x,this.y,this.size,0,Math.PI*2);

ctx.fillStyle="#5ad1ff";

ctx.shadowBlur=20;

ctx.shadowColor="#5ad1ff";

ctx.fill();

}

}

for(let i=0;i<total;i++){

particles.push(new Particle());

}

let mouse={

x:null,

y:null

};

window.addEventListener("mousemove",e=>{

mouse.x=e.x;

mouse.y=e.y;

});

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

particles.forEach(p=>{

p.move();

p.draw();

});

for(let a=0;a<particles.length;a++){

for(let b=a;b<particles.length;b++){

let dx=particles[a].x-particles[b].x;

let dy=particles[a].y-particles[b].y;

let dist=Math.sqrt(dx*dx+dy*dy);

if(dist<120){

ctx.beginPath();

ctx.strokeStyle="rgba(90,209,255,0.15)";

ctx.lineWidth=1;

ctx.moveTo(particles[a].x,particles[a].y);

ctx.lineTo(particles[b].x,particles[b].y);

ctx.stroke();

}

}

}

particles.forEach(p=>{

if(mouse.x){

let dx=mouse.x-p.x;

let dy=mouse.y-p.y;

let d=Math.sqrt(dx*dx+dy*dy);

if(d<180){

ctx.beginPath();

ctx.strokeStyle="rgba(199,155,255,.4)";

ctx.moveTo(mouse.x,mouse.y);

ctx.lineTo(p.x,p.y);

ctx.stroke();

}

}

});

requestAnimationFrame(animate);

}

animate();
