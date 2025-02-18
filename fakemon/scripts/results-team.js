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
    // console.log(type);
}

function getEvo(data){
    results=data;
    let result;
    let random = getRandomInt(4);
    evo=results.evo[random]
    // console.log(evo);
}

let pinlimit=0;
let loadnum=0;
let pinnum=0;
let pokeinscreen=0;

function pinned(){ 
    document.querySelectorAll(".pin").forEach(pin=>{
        if (pin.classList.contains("clicked")){
            pokeinscreen+=1;
        }
    });
    for (let i = 0; i < (pinlimit+7); i++) { 
        // console.log(pinlimit);
        let item=document.querySelector(`#pin${i}`)
        try{
            if(!item.classList.contains("clicked")){
                // item.remove();
                item.closest("div.team").remove();           
            }
        }  
        catch{

        }             
    }
}

let animaldata={};
let colordata=[];
let fakemondata={"animal":{},"colors":[],"type":"","evo":""};
let fakemondatalist=[];

async function createTeam(){
    loadnum=0;
    // document.querySelector(".group").innerHTML=``;
    document.querySelector(".create").style.visibility="hidden";
    for (let i = 0; i < (6-pokeinscreen); i++) {
        if (loadnum==0){
            document.querySelector(".loading").innerHTML="Loading.";
            loadnum+=1;
        }
        else{
            if (loadnum==1){
                document.querySelector(".loading").innerHTML="Loading..";
                loadnum+=1;
            }
            else{
                if (loadnum==2){
                    document.querySelector(".loading").innerHTML="Loading...";
                    loadnum=0;
                }  
            }
        }          
        await getData(url,getAnimal);
        colorlist=[];
        await getData(url1,getColor);
        await getData(url1,getColor);
        await getData(url1,getColor);
        // console.log(colorlist);
        await getData(url2,getType);
        await getData(url3,getEvo);
        let card = document.createElement("div");
        card.setAttribute("class","team");
        let pin=document.createElement("button");
        pin.setAttribute("id",`pin${pinlimit+1+i}`);
        pin.setAttribute("class",`pin`);
        pin.innerHTML=`<img src="images/pin.png" width="35px">`;
        pin.addEventListener("click",()=>{
            pinner(pin,pinlimit+i+1);
        })
        let save=document.createElement("button");
        save.setAttribute("class","bookmark");
        save.innerHTML=`<img src="images/bookmark.png" width="35px">`;
        let imageSrc=animallist[0];
        let commonName=animallist[1];
        let wikiLink=animallist[2];
        let color1=colorlist[0];
        let color2=colorlist[1];
        let color3=colorlist[2];
        let typing=type;
        let evolution=evo;
        save.addEventListener("click",()=>{
            saved(save);
            animaldata={"imageSrc":imageSrc,"commonName":commonName,"wikiLink":wikiLink};
            fakemondata.animal=animaldata;
            colordata[0]=color1;
            colordata[1]=color2;
            colordata[2]=color3;
            fakemondata.colors=colordata;
            fakemondata.type=typing;
            fakemondata.evo=evolution;
            fakemondatalist = localStorage.getItem("saved");
            fakemondatalist = fakemondatalist ? JSON.parse(fakemondatalist) : [];
            fakemondatalist.push(JSON.stringify(fakemondata));
            console.log(fakemondatalist);
            localStorage.setItem("saved",JSON.stringify(fakemondatalist));
            save.disabled=true;
        })
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
        card.appendChild(pin);
        card.appendChild(save);
        document.querySelector(".group").appendChild(card);
    }
    document.querySelector(".loading").innerHTML=``;
    document.querySelector(".create").style.visibility="visible";
    pinnum=1;
}

function pinner(pinner,find){
        pinner.classList.toggle('clicked');
            if (pinlimit<find)
                pinlimit=find;         
}

function saved(button){
    button.classList.add("clicked");
}

const button = document.querySelector(".create");
button.addEventListener("click",()=>{
    document.querySelector(".group").style.display="grid";
    document.querySelector(".group").classList.add('fade-in');
    pokeinscreen=0;
    if (pinnum!=0)
        pinned();
    createTeam();
})
