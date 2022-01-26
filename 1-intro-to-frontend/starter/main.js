const noteForm = document.getElementById("note-form");
const notesDiv = document.getElementById("notes");

// make me add more notes on submit
noteForm.onsubmit = function(event) {
    event.preventDefault();

    const pNode = document.createElement("p")
    pNode.innerText = "Sample Text"
    notesDiv.appendChild(pNode);
}
