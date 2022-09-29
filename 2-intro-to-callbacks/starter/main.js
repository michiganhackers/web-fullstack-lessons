const changeableText = document.getElementById("changeable-text");
const changeableTextContainer = document.getElementById("changeable-text-container");
const fontIncreaseButton = document.getElementById("increase-font-size");
const fontDecreaseButton = document.getElementById("decrease-font-size");
const innerDiv = document.getElementById("inner-div");
const middleDiv = document.getElementById("middle-div");
const outerDiv = document.getElementById("outer-div");
const addButton = document.getElementById('add-button');
// TODO: add your buttons here after you add them to the HTML
const buttonsContainer = document.getElementById('buttons-container');


// initializes font size to browser default
const defaultSize = parseInt(window.getComputedStyle(document.body).getPropertyValue('font-size'), 10);
let fontSize = defaultSize;

fontIncreaseButton.onclick = function (event) {
    ++fontSize;
    changeableText.style.fontSize = `${fontSize}px`
}

// TODO: 
// Add an onclick callback to fontDecreaseButton that decrements fontSize.
// Then, set the font size of changeableText

// TODO:
// Add more buttons and event handlers that modify the style attribute.
// Feel free to use the randomColor() helper function

// TODO:
// Add an onclick callback to addButton that inserts a new button inside buttonsContainer

// TODO:
// Add an onclick attribute to each button that deletes that button using Element.remove()

// TODO:
// Add a button that only does something when double clicked.
// Try not to use the ondblclick attribute!

// TODO:
// Modify your existing buttons so that they reset their style when ctrl+clicked.

// use this if you want
function randomColor() {
    return `rgb(${randRange(0, 255)}, ${randRange(0, 255)}, ${randRange(0, 255)})`;
}

// helper for randomColor()
function randRange(start, end) {
    return Math.floor(Math.random() * (end - start + 1) + start);
}

// Example of event bubbling
changeableTextContainer.onclick = function (event) {
    if (event.target.tagName === "BUTTON") {
        console.log("You clicked one of the style-changing buttons. Notice how events bubble up.");
    } else {
        console.log("You clicked the style-changing container directly!")
    }
}
