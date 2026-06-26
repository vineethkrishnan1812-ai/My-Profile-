// ======================================
// HR GALAXY PORTFOLIO V3
// script.js
// ======================================

// LOADER
window.addEventListener("load",()=>{

document.body.classList.add("loaded");

const loader=document.getElementById("loader");

if(loader){

loader.style.opacity="0";

setTimeout(()=>{

loader.style.display="none";

},600);

}

});

// ======================================
// TYPING EFFECT
// ======================================

const words=[

"Human Resources",

"Finance Graduate",

"MBA Graduate",

"Recruitment Specialist",

"Payroll Management",

"Employee Relations"

];

let wordIndex=0;

let charIndex=0;

let deleting=false;

const typing=document.getElementById("typing");

function typeEffect(){

if(!typing)return;

const current=words[wordIndex];

if(!deleting){

typing.textContent=current.substring(0,charIndex++);

if(charIndex>current.length){

deleting=true;

setTimeout(typeEffect,1800);

return;

}

}else{

typing.textContent=current.substring(0,charIndex--);

if(charIndex===0){

deleting=false;

wordIndex=(wordIndex+1)%words.length;

}

}

setTimeout(typeEffect,deleting?45:110);

}

typeEffect();


// ======================================
// MOUSE LIGHT
// ======================================

document.addEventListener("mousemove",(e)=>{

document.documentElement.style.setProperty(

"--mouseX",

e.clientX+"px"

);

document.documentElement.style.setProperty(

"--mouseY",

e.clientY+"px"

);

});


// ======================================
// NAVBAR
// ======================================

const navbar=document.querySelector(".navbar");

window.addEventListener("scroll",()=>{

if(window.scrollY>60){

navbar.classList.add("active");

}else{

navbar.classList.remove("active");

}

});


// ======================================
// SCROLL REVEAL
// ======================================

const revealItems=document.querySelectorAll(

".section,.glass-card,.skill-card,.timeline-item,.education-card,.contact-card"

);

const observer=new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},

{

threshold:.15

}

);

revealItems.forEach(item=>{

observer.observe(item);

});


// ======================================
// FLOATING EFFECT
// ======================================

document.querySelectorAll(".glass-card").forEach(

(card,index)=>{

card.style.animation=

`floatCard ${6+index}s ease-in-out infinite`;

}

);


// ======================================
// PARALLAX
// ======================================

document.addEventListener("mousemove",(e)=>{

const x=(e.clientX/window.innerWidth-.5)*20;

const y=(e.clientY/window.innerHeight-.5)*20;

document.querySelectorAll(".blob").forEach(

(blob,i)=>{

blob.style.transform=

`translate(${x*(i+1)*0.3}px,

${y*(i+1)*0.3}px)`;

}

);

});


// ======================================
// ACTIVE MENU
// ======================================

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll(".navbar a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const top=section.offsetTop-120;

if(window.scrollY>=top){

current=section.id;

}

});

navLinks.forEach(link=>{

link.classList.remove("current");

if(link.getAttribute("href")==="#"+current){

link.classList.add("current");

}

});

});


// ======================================
// YEAR
// ======================================

const year=document.getElementById("year");

if(year){

year.textContent=new Date().getFullYear();

}
