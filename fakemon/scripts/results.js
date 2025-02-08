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
        <h2>${pokemon.binomialName}</h2>
        <a href="${pokemon.wikiLink}" target="_blank">Learn more about it</a>
        </div> 
        `;
    document.querySelector(".animal").appendChild(fakemon);
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
    document.querySelector(".colors").appendChild(fakemon);
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
    document.querySelector(".Type").appendChild(fakemon);
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
    document.querySelector(".Evolution").appendChild(fakemon);
}
const button = document.querySelector("button");
button.addEventListener("click",()=>{
    document.querySelectorAll(".res").forEach(item =>{
        item.style.display="block"; 
        item.classList.add('fade-in')
    });
    document.querySelector(".animal").innerHTML="<h1>Animal</h1>";
    getData(url,getAnimal);
    document.querySelector(".colors").innerHTML="<h1>Colors</h1>";
    getData(url1,getColor);
    getData(url1,getColor);
    getData(url1,getColor);
    document.querySelector(".Type").innerHTML="<h1>Type</h1>";
    getData(url2,getType);
    document.querySelector(".Evolution").innerHTML="<h1>Evolutions</h1>";
    getData(url3,getEvo);
})
