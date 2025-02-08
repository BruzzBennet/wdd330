const url = "https://extinct-api.herokuapp.com/api/v1/animal/";
const url1 = "https://x-colors.yurace.pro/api/random";
const url2 = "data/types.json"
const url3 = "data/evolution.json"
let results = null;
async function getData(url,type) {
  const response = await fetch(url);
  //check to see if the fetch was successful
  if (response.ok) {
    // the API will send us JSON...but we have to convert the response before we can use it
    // .json() also returns a promise...so we await it as well.
    const data = await response.json();
    type(data);
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
    }
  )
}
function getColor(data) {
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
    }    
    else
    {
        fakemon.innerHTML =`
            <div class="res1">
            <h2>${results.types[random1]} - ${results.types[random2]}</h2>
            </div>
        `;
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
            getData(url,type);
            getData(url,type);
            getData(url,type);
        }
    }
    
}

const button = document.querySelector(".create");
button.addEventListener("click",()=>{
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
})
