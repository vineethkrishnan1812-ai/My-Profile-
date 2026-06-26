window.addEventListener("load", function () {
    document.getElementById("loader").style.display = "none";
});
const words=[
"HR Professional",
"Finance Graduate",
"MBA Graduate",
"Recruitment Specialist"
];

let i=0;

let j=0;

let current="";

let deleting=false;

function type(){

const el=document.getElementById("typing");

if(!el)return;

if(!deleting){

current=words[i].substring(0,j++);

el.innerHTML=current;

if(j>words[i].length){

deleting=true;

setTimeout(type,1500);

return;

}

}else{

current=words[i].substring(0,j--);

el.innerHTML=current;

if(j===0){

deleting=false;

i=(i+1)%words.length;

}

}

setTimeout(type,deleting?50:120);

}

type();
document.addEventListener("mousemove",(e)=>{

document.body.style.setProperty("--x",e.clientX+"px");

document.body.style.setProperty("--y",e.clientY+"px");

});
/* Mouse Spotlight */
body::before{
content:"";
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
pointer-events:none;
background:radial-gradient(
300px circle at var(--x,50%) var(--y,50%),
rgba(90,209,255,.12),
transparent 60%
);
z-index:-1;
}