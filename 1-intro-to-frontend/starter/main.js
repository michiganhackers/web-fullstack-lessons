const noteForm = document.getElementById("note-form");
const notes = document.getElementById("notes");
const titleInput = document.getElementById("title-input");

// make me add more notes on submit
noteForm.onsubmit = function(event) {
    event.preventDefault();
    const title = titleInput.value;

    const pNode = document.createElement("p")
    pNode.innerText = "Sample Text"
    notes.appendChild(pNode);
}
