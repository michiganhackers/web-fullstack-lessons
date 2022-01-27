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


// initialize font size to browser default
const defaultSize = parseInt(window.getComputedStyle(document.body).getPropertyValue('font-size'), 10);
let fontSize = defaultSize;

fontIncreaseButton.onclick = function (event) {
    if (event.ctrlKey) {
        fontSize = defaultSize;
    } else {
        ++fontSize;
    }
    changeableText.style.fontSize = `${fontSize}px`
}

fontDecreaseButton.onclick = function (event) {
    if (event.ctrlKey) {
        fontSize = defaultSize;
    } else {
        --fontSize;
    }
    changeableText.style.fontSize = `${fontSize}px`
}

changeColorButton.onclick = function (event) {
    if (event.ctrlKey) {
        changeableText.style.color = 'black';
    } else {
        changeableText.style.color = randomColor();
    }
}

// in ms
const maxDelay = 200;
let lastClickTime = 0;
// this can also be done using ondblclick, but the purpose is to show how to manually implement it
changeBgColorButton.onclick = function (event) {
    if (event.ctrlKey) {
        changeableText.style.backgroundColor = 'transparent';
    } else {
        if (event.timeStamp - lastClickTime < maxDelay) {
            lastClickTime = 0;
            changeableText.style.backgroundColor = randomColor();
        }
        lastClickTime = event.timeStamp;
    }
}

function randomColor() {
    return `rgb(${randRange(0, 255)}, ${randRange(0, 255)}, ${randRange(0, 255)})`;
}

function randRange(start, end) {
    return Math.floor(Math.random() * (end - start + 1) + start);
}

innerDiv.onclick = function (event) {
    console.log('Green div clicked!');
}

middleDiv.onclick = function (event) {
    console.log('Yellow div clicked!');
}

outerDiv.onclick = function (event) {
    console.log('Red div clicked!');
}

/**
 * For the add button, there are multiple ways to do it
 * Some examples are shown below using different styles
 * You can swap between them and debug them to see how they work
 */

// Delete using a closure
function deleteWithClosure(event) {
    let newButton = document.createElement('button');
    newButton.innerText = 'Delete me';
    newButton.onclick = function (event) {
        newButton.remove();
    }
    buttonsContainer.appendChild(newButton);
}

// Delete a button element by targeting its id, using a closure to keep track of the id incrementor
const deleteById = (function () {
    let buttonsAdded = 0;

    function deleteButton(index) {
        return () => document.getElementById(String(index))?.remove()
    }

    return function (event) {
        let newButton = document.createElement('button');
        newButton.innerText = `Delete me: ${buttonsAdded}`;
        newButton.id = String(buttonsAdded);
        newButton.onclick = deleteButton(buttonsAdded);
        buttonsContainer.appendChild(newButton);
        ++buttonsAdded;
    }
})()


addButton.onclick = deleteWithClosure;
// addButton.onclick = deleteById;
