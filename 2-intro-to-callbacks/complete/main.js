const changeableText = document.getElementById("changeable-text");
const fontIncreaseButton = document.getElementById("increase-font-size");
const fontDecreaseButton = document.getElementById("decrease-font-size");
const changeColorButton = document.getElementById("change-color");
const changeBgColorButton = document.getElementById("change-bg-color");
const innerDiv = document.getElementById("inner-div");
const middleDiv = document.getElementById("middle-div");
const outerDiv = document.getElementById("outer-div");
const addButton = document.getElementById('add-button');
const buttonsContainer = document.getElementById('buttons-container');
const main = document.querySelector("main")


// initalize font size to browser default
const defaultSize = parseInt(window.getComputedStyle(document.body).getPropertyValue('font-size'), 10);
let fontSize = defaultSize;

fontIncreaseButton.onclick = function (event) {
    if (event.metaKey) {
        fontSize = defaultSize;
    }
    else {
        ++fontSize;
    }
    changeableText.style.fontSize = `${fontSize}px`
}

fontDecreaseButton.onclick = function (event) {
    if (event.metaKey) {
        fontSize = defaultSize;
    }
    else {
        --fontSize;
    }
    changeableText.style.fontSize = `${fontSize}px`
}

changeColorButton.onclick = function (event) {
    if (event.metaKey) {
        changeableText.style.color = 'black';
    }
    else {
        changeableText.style.color = randomColor();
    }
}

// in ms
const maxDelay = 200;
let lastClickTime = 0;
changeBgColorButton.onclick = function (event) {
    if (event.timeStamp - lastClickTime < maxDelay) {
        lastClickTime = 0;
        if (event.metaKey) {
            changeableText.style.backgroundColor = 'transparent';
        }
        else {
            changeableText.style.backgroundColor = randomColor();
        }
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

innerDiv.onclick = function (event) {
    alert('Green div clicked!');
}

middleDiv.onclick = function (event) {
    alert('Yellow div clicked!');
}

outerDiv.onclick = function (event) {
    alert('Red div clicked!');
}

addButton.onclick = function (event) {
    let newButton = document.createElement('button');
    newButton.innerText = 'Delete me';
    newButton.onclick = function (event) {
        newButton.remove();
    }
    buttonsContainer.appendChild(newButton);
}