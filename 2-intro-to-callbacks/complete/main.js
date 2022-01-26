const changeableText = document.getElementById("changeable-text");
const fontIncreaseButton = document.getElementById("increase-font-size");
const fontDecreaseButton = document.getElementById("decrease-font-size");
const changeColorButton = document.getElementById("change-color");
const changeBgColorButton = document.getElementById("change-bg-color");
const main = document.querySelector("main")

let fontSize = 14;
fontIncreaseButton.onclick = function (event) {
    ++fontSize;
    changeableText.style.fontSize = `${fontSize}px`
}

fontDecreaseButton.onclick = function (event) {
    --fontSize;
    changeableText.style.fontSize = `${fontSize}px`
}

changeColorButton.onclick = function (event) {
    changeableText.style.color = randomColor();
}

// in ms
const maxDelay = 200;
let lastClickTime = 0;
changeBgColorButton.onclick = function (event) {
    if (event.timeStamp - lastClickTime < maxDelay) {
        lastClickTime = 0;
        changeableText.style.backgroundColor = randomColor();
    }
    lastClickTime = event.timeStamp;
}

main.onclick = function (event) {
    // show bubbling and dynamic dom manipulation
}

function randomColor() {
    return `rgb(${randRange(0, 255)}, ${randRange(0, 255)}, ${randRange(0, 255)})`;
}

function randRange(start, end) {
    return Math.floor(Math.random() * (end - start + 1) + start);
}
