
const isSfw = document.getElementById("sfw");
const isNsfw = document.getElementById("nsfw");
const getInputField = document.getElementById("waifu_name")
const btn = document.getElementById("btn")

async function getWaifus() {
    const typeElement = document.querySelector('input[name="rating"]:checked')
    const type = typeElement.value
    const inputField = getInputField
    const waifu = inputField.value.trim()
    const mainContainer = document.getElementById("container")
    const load = document.createElement("div")
    load.innerHTML = "Betöltés..."
    load.classList.add("load")
    mainContainer.appendChild(load)

    const url = `https://api.waifu.pics/${type}/${waifu}`;
    const res = await fetch(url);
    const waifudata = await res.json();
    mainContainer.removeChild(load)
    
    if (waifu === ""){
        alert("Kérlek adj meg egy kategóriát!");
        return;
    }
    
    if (!res.ok){
        alert("Hiba! Lehet, hogy rossz kategóriát írtál be?")
        return;
    }
    
    
    
    const card = document.createElement("div")
    card.className = "imgCard"
    
    const img = document.createElement("img")
    img.src = waifudata.url
    
    const overlay = document.createElement("div")
    overlay.className = "imgOverlay"
    
    const favBtn = document.createElement("button")
    favBtn.innerHTML = "🤍"
    favBtn.addEventListener("click", () => addFav(waifudata.url, favBtn))

    const downloadBtn = document.createElement("button")
    downloadBtn.innerHTML = "⬇"

    overlay.appendChild(favBtn)
    overlay.appendChild(downloadBtn)

    card.appendChild(img)
    card.appendChild(overlay)

    mainContainer.appendChild(card)
}

let isfav
function addFav(imgurl, favBtn){
    const favPanel = document.getElementById("favPanel")
    const existing = document.querySelectorAll(".favImg")
    const img = document.createElement("img")
    if (!isfav){
        isfav = true
        favBtn.innerHTML = "❤️"
        const isFav = Array.from(existing).some(x => x.src === imgurl)
        if (isFav) return

        img.src = imgurl
        img.classList.add("favImg")
        favPanel.appendChild(img)
    }
    else{
        isfav = false
        favBtn.innerHTML = "🤍"
        const del = Array.from(existing).find(x => x.src === imgurl)
        del.remove()
    }
}

function handleRatingChange() {
    const pay = document.getElementById("pay");
    if (isNsfw.checked){
        pay.style.display = "block";
        btn.disabled = true;
    }
}

function setCategory(name) {
    const inputField = getInputField
    inputField.value = name;
}

function closePay(){
    pay.style.display = "none"
    if (isSfw){
        isSfw.checked = true;
    }    
}

function randomCategory() {
    const categories = [
        "waifu","neko","shinobu","megumin","bully","cuddle","cry",
        "hug","awoo","kiss","lick","pat","smug","bonk","yeet",
        "blush","smile","wave","highfive","handhold","nom",
        "bite","glomp","slap","kill","kick","happy","wink","poke",
        "dance","cringe"
    ];

    const random = categories[Math.floor(Math.random() * categories.length)];
    getInputField.value = random;
}

function openFavs(){
    const panel = document.getElementById("favPanel")
    panel.classList.toggle("open");
}

const bad = document.getElementById("nsfw")
bad.addEventListener("click", handleRatingChange)

const good = document.getElementById("sfw")
good.addEventListener("click", handleRatingChange)