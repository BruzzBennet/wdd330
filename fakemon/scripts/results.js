const url = "https://extinct-api.herokuapp.com/api/v1/animal/";
const url1 = "https://x-colors.yurace.pro/api/random";
const url2 = "data/types.json";
const url3 = "data/evolution.json";

let animaldata={};
let colordata=[];
let fakemondata={"animal":{},"colors":[],"type":"","evo":""};
let fakemondatalist=[];

let results = null;
async function getData(url,type,num) {
  const response = await fetch(url);
  //check to see if the fetch was successful
  if (response.ok) {
    // the API will send us JSON...but we have to convert the response before we can use it
    // .json() also returns a promise...so we await it as well.
    const data = await response.json();
    type(data,num);
  }
}
function getAnimal(data) {
    results = data;
    // console.log("first: ", results);
    results.data.forEach((pokemon)=>{
        let fakemon = document.createElement("div");
        fakemon.innerHTML =`
        <div class="res1">
        <img src="${pokemon.imageSrc}" loading="lazy"/>
        <h2>${pokemon.commonName}</h2>
        <a href="${pokemon.wikiLink}" target="_blank">Click here to learn more</a>
        </div> 
        `;
    document.querySelector("#animalres").appendChild(fakemon);
        animaldata={"imageSrc":pokemon.imageSrc,"commonName":pokemon.commonName,"wikiLink":pokemon.wikiLink};
    })
  fakemondata.animal=animaldata;
//   console.log(JSON.stringify(fakemondata));
}
function getColor(data,num) {
    results = data;
    // console.log("first: ", results);
    let fakemon = document.createElement("div");
        fakemon.innerHTML =`
            <div class="res1">
            <div class="color" style="background-color:${results.rgb}"></div>
            <p> HEX: ${results.hex}</p>
            <p> RGB: ${results.rgb}</p>
            </div>
        `;
    document.querySelector("#colorres").appendChild(fakemon);
    colordata[num]=results.rgb;
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function getType(data){
    results = data;
    // console.log("first: ", results);
    let fakemon = document.createElement("div");
    let random1=getRandomInt(18);
    let random2=getRandomInt(18);
    if (random1 == random2)
    {
        fakemon.innerHTML =`
            <div class="res1">
            <h2>${results.types[random1]}</h2>
            </div>
        `;
        fakemondata.type=results.types[random1];
    }    
    else
    {
        fakemon.innerHTML =`
            <div class="res1">
            <h2>${results.types[random1]} - ${results.types[random2]}</h2>
            </div>
        `;
        fakemondata.type=`${results.types[random1]} - ${results.types[random2]}`;
    }       
    document.querySelector("#typeres").appendChild(fakemon);
}
function getEvo(data){
    results=data;
    let random = getRandomInt(4);
    let fakemon = document.createElement("div");
    fakemon.innerHTML=`
        <div class="res1">
        <h2>${results.evo[random]}</h2>
        </div>
    `;
    document.querySelector("#evores").appendChild(fakemon);
    fakemondata.evo=results.evo[random];
}

function pinned(pin,place,url,type,color=false){
    if (color==false){
        if(!document.querySelector(`#${pin}`).classList.contains("clicked")){
            document.querySelector(`#${place}`).innerHTML=``;
            getData(url,type);
        }
    }
    else{
        if(!document.querySelector(`#${pin}`).classList.contains("clicked")){
            document.querySelector(`#${place}`).innerHTML=``;
            getData(url,type,0);
            getData(url,type,1);
            getData(url,type,2);
            // console.log(colordata);
            fakemondata.colors=colordata;
        }
    }
    
}
const save= document.querySelector(".save");
const button = document.querySelector(".create");
button.addEventListener("click",()=>{
    document.querySelector("footer").style.position="relative";
    document.querySelector(".save").style.display="inline";
    save.classList.remove('clicked');
    save.innerHTML="Save"
    document.querySelector(".results").style.display="grid";
    document.querySelector(".results").classList.add('fade-in');
    document.querySelectorAll(".res").forEach(item =>{
        item.style.display="block"; 
        item.classList.add('fade-in')
    });
    // document.querySelectorAll(".res1").forEach(item =>{
    //     item.innerHTML=``;
    // });
    pinned("pin1","animalres",url,getAnimal);
    pinned("pin2","colorres",url1,getColor,true);
    pinned("pin3","typeres",url2,getType);
    pinned("pin4","evores",url3,getEvo);
    // console.log(JSON.stringify(fakemondata));
})

save.addEventListener("click",()=>{
    if (!save.classList.contains("clicked")){
    // document.querySelector(".save").style.display="none";
        save.classList.add('clicked');
        save.innerHTML="Saved!"
        fakemondatalist = localStorage.getItem("saved");
        fakemondatalist = fakemondatalist ? JSON.parse(fakemondatalist) : [];
        fakemondatalist.push(JSON.stringify(fakemondata));
        console.log(fakemondatalist);
        localStorage.setItem("saved",JSON.stringify(fakemondatalist));
    }
})
