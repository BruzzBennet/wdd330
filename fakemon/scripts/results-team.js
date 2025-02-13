const url = "https://extinct-api.herokuapp.com/api/v1/animal/";
const url1 = "https://x-colors.yurace.pro/api/random";
const url2 = "data/types.json"
const url3 = "data/evolution.json"
let animallist, colorlist,type,evo;
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
    animallist=[];
    results.data.forEach((pokemon)=>{
        animallist.push(pokemon.imageSrc);
        animallist.push(pokemon.commonName);
        animallist.push(pokemon.wikiLink);
    })
}

function getColor(data) {
    results = data;
    colorlist.push(results.rgb);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getType(data){
    results = data;
    let result;
    let random1=getRandomInt(18);
    let random2=getRandomInt(18);
    if (random1 == random2)
        type=results.types[random1];
    else
        type=`${results.types[random1]} - ${results.types[random2]}`;
    console.log(type);
}

function getEvo(data){
    results=data;
    let result;
    let random = getRandomInt(4);
    evo=results.evo[random]
    console.log(evo);
}

async function createTeam(){
    document.querySelector(".group").innerHTML=``;
    document.querySelector(".create").style.visibility="hidden";
    for (let i = 0; i < 6; i++) {
        if (i==0 || i==3)
            document.querySelector(".loading").innerHTML="Loading.";
        if (i==1 || i==4)
            document.querySelector(".loading").innerHTML="Loading..";
        if (i==2 || i==5)
            document.querySelector(".loading").innerHTML="Loading...";
        await getData(url,getAnimal);
        colorlist=[];
        await getData(url1,getColor);
        await getData(url1,getColor);
        await getData(url1,getColor);
        console.log(colorlist);
        await getData(url2,getType);
        await getData(url3,getEvo);
        let card = document.createElement("div");
        card.setAttribute("class","team");
        // console.log(pokemon);
        card.innerHTML=`  
            <div class="animalres">
            <img src="${animallist[0]}" loading="lazy"/>
            <h2>${animallist[1]}</h2>
            <a href="${animallist[2]}" target="_blank">Click here to learn more</a>
            </div>
            <div class="rowone">
                <h2>Colors</h2>  
                <div class="color colorone" style="background-color:${colorlist[0]}"></div>
                <div class="color colortwo" style="background-color:${colorlist[1]}"></div>
                <div class="color colorthree" style="background-color:${colorlist[2]}"></div>
            </div>
            <div class="rowtwo">
                <h2>Typing</h2>  
                <h2>${type}</h2>
            </div>
            <div class="rowthree">
                <h2>Evolution Line</h2>  
                <h2>${evo}</h2>
            </div>
            `;
        document.querySelector(".group").appendChild(card);
    }
    document.querySelector(".loading").innerHTML=``;
    document.querySelector(".create").style.visibility="visible";
}

const button = document.querySelector(".create");
button.addEventListener("click",()=>{
    document.querySelector(".group").style.display="grid";
    document.querySelector(".group").classList.add('fade-in');
    createTeam();
})
