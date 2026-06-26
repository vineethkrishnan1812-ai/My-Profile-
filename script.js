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