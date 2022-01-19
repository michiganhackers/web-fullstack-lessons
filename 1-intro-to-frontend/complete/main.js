const noteForm = document.getElementById("note-form");
const titleInput = document.getElementById("title-input");
const bodyInput = document.getElementById("body-input");
const notes = document.getElementById("notes");

noteForm.onsubmit = function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const title = formData.get("title");
    const body = formData.get("body");

    if (!title && !body) {
        return;
    }

    titleInput.value = "";
    bodyInput.value = "";

    const articleNode = document.createElement("article");
    const titleNode = document.createElement("h3");
    titleNode.innerText = title;
    const bodyNode = document.createElement("p");
    bodyNode.innerText = body;
    articleNode.appendChild(titleNode);
    articleNode.appendChild(bodyNode);
    notes.appendChild(articleNode);
}
