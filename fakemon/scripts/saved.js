let data=JSON.parse(localStorage.getItem("saved"));

function displaySaved(data){
    console.log(data);
    document.querySelector(".savedfakemon").innerHTML="";
    data.forEach((item) => {
        let del=document.createElement("button");
        del.setAttribute("class","pin del");
        del.innerHTML=`<img src="images/trash.png" width="35px">`;
        del.addEventListener("click",()=>{
            let finditem=JSON.stringify(item);
            Sure(finditem);
        });
        item=JSON.parse(item);
        // console.log(item.animal);
        let card = document.createElement("div");
        card.setAttribute("class","team saveteam");
        card.innerHTML=`  
            <div class="animalres">
            <img src="${item.animal.imageSrc}" loading="lazy"/>
            <h2>${item.animal.commonName}</h2>
            <a href="${item.animal.wikiLink}" target="_blank">Click here to learn more</a>
            </div>
            <div class="rowone">
                <h2>Colors</h2>  
                <div class="color colorone" style="background-color:${item.colors[0]}"></div>
                <div class="color colortwo" style="background-color:${item.colors[1]}"></div>
                <div class="color colorthree" style="background-color:${item.colors[2]}"></div>
            </div>
            <div class="rowtwo">
                <h2>Typing</h2>  
                <h2>${item.type}</h2>
            </div>
            <div class="rowthree">
                <h2>Evolution Line</h2>  
                <h2>${item.evo}</h2>
            </div>
            `;
            card.appendChild(del);
        document.querySelector(".savedfakemon").appendChild(card);
    })
}

function deletefakemon(item){
    let index=data.indexOf(item);
    console.log(index);
    if (index > -1) { // only splice array when item is found
        data.splice(index, 1); // 2nd parameter means remove one item only
    }
    // console.log(data);
    localStorage.setItem("saved",JSON.stringify(data));
    displaySaved(data);

}

const courseDetails = document.getElementById('sure');

function Sure(item){
    courseDetails.innerHTML=``;
    courseDetails.innerHTML=`
    <button id="closeModal">X</button>
    <h2>Do you want to delete this Fakemon Idea?</h2>
    <button id="sureyes">Yes</button>
    <button id="sureno">No</button>
        `;
    courseDetails.showModal();
    closeModal.addEventListener('click',()=>{
        courseDetails.close();
    });
    
    document.getElementById("sureyes").addEventListener('click',()=>{
        deletefakemon(item);
        courseDetails.close();
    });
    
    document.getElementById("sureno").addEventListener('click',()=>{
        courseDetails.close();
    });
    
}

displaySaved(data);
document.querySelector("footer").style.position="relative";