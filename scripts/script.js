
const isSfw = document.getElementById("sfw");
const isNsfw = document.getElementById("nsfw");
const getInputField = document.getElementById("waifu_name")
const btn = document.getElementById("btn")

async function getWaifus() {
    const typeElement = document.querySelector('input[name="rating"]:checked')
    const type = typeElement.value
    const inputField = getInputField
    const waifu = inputField.value.trim()
    
    const url = `https://api.waifu.pics/${type}/${waifu}`;
    const res = await fetch(url);
    const waifudata = await res.json();
    
    if (waifu === "") {
        alert("Kérlek adj meg egy kategóriát!");
        return;
    }

    if (!res.ok) {
        alert("Hiba! Lehet, hogy rossz kategóriát írtál be?")
        return;
    }

    const mainContainer = document.getElementById("container")
    const img = document.createElement("img")
    img.src = waifudata.url;
    mainContainer.appendChild(img);
}

function handleRatingChange() {

    const inputField = getInputField;
    const pay = document.getElementById("pay");

    if (isNsfw.checked) {
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
    if (isSfw) {
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

const bad = document.getElementById("nsfw")
bad.addEventListener("click", handleRatingChange)

const good = document.getElementById("sfw")
good.addEventListener("click", handleRatingChange)