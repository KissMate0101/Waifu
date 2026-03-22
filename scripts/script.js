
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

    const cur = Array.from(card).some(x => x.src === imgurl)
    if (cur) return
    
    const overlay = document.createElement("div")
    overlay.className = "imgOverlay"
    
    const favBtn = document.createElement("button")
    favBtn.innerHTML = "🤍"
    favBtn.addEventListener("click", () => addFav(waifudata.url, favBtn))

    const downloadBtn = document.createElement("button")
    downloadBtn.innerHTML = "⬇"
    downloadBtn.addEventListener("click", () => downloadWs(waifudata.url))

    overlay.appendChild(favBtn)
    overlay.appendChild(downloadBtn)

    card.appendChild(img)
    card.appendChild(overlay)

    mainContainer.appendChild(card)
}

function updateFavCount() {
    const count = document.getElementById("favPanel").children.length - 2;
    const badge = document.getElementById("fav-count");
    badge.innerHTML = count
    if(count === 0) badge.style.display = "none"
    else{
        badge.style.display = "flex"
        // badge.style.animation = "badgegrow 0.3s ease"
        badge.style.transform = "scale(1.3)"
        setTimeout(() => badge.style.transform = "scale(1)", 200)
    }
}

function saveFavs() {
    const imgs = document.querySelectorAll(".favImg");
    const urls = Array.from(imgs).map(img => img.src);
    localStorage.setItem("favs", JSON.stringify(urls));
}

function loadFavs(){
    const saved = localStorage.getItem("favs");
    if (!saved) return;

    const urls = JSON.parse(saved);
    const favPanel = document.getElementById("favPanel");

    urls.forEach(url => {
        const img = document.createElement("img");
        img.src = url;
        img.classList.add("favImg");
        favPanel.appendChild(img);
    });
    
    updateFavCount()
}
loadFavs()

function removeFavs(){
    const images = document.querySelectorAll(".favImg");
    if (images.length === 0) return;

    const conf = confirm("Biztos kiüríted a kukát? 🗑️")
    if (conf) {
        images.forEach(img => img.remove());
        localStorage.removeItem("favs");
        updateFavCount();
    }
}

function addFav(imgurl, favBtn){
    const favPanel = document.getElementById("favPanel")
    const existing = document.querySelectorAll(".favImg")
    let isfav = favBtn.innerHTML === "❤️"

    if (!isfav){
        favBtn.innerHTML = "❤️"
        const cur = Array.from(existing).some(x => x.src === imgurl)
        if (cur) return
        
        const img = document.createElement("img")
        img.src = imgurl
        img.classList.add("favImg")
        favPanel.appendChild(img)
    }
    else{
        isfav = false
        favBtn.innerHTML = "🤍"
        const dom = Array.from(existing).find(x => x.src === imgurl)
        dom.remove()
    }
    saveFavs();
    updateFavCount()
}

function downloadWs(waifudata){
    try {
        const a = document.createElement("a")
        a.href = waifudata.url;
        a.download = "waifu_" + Date.now() + ".jpg";
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } 
    catch (error)
    {
        alert("Nem tölthető le kép, amig nincs előfizetésed!")
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
    btn.disabled = false;
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