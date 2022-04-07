async function getAllNotes() {

}

async function getAllUserNotes(username) {

}

async function getNote(note_id) {

}

async function addNote(title, body) {

}

async function deleteNote(note_id) {

}


async function login(username, password) {
    const res = await fetch("/api/login", {
            headers: { "content-type": "application/json", "accept-type": "application/json"},
            body: JSON.stringify({
                username,
                password,
            }),
            credentials: "include",
            method: "POST",
            mode: "cors",
        })
    ;
    return res.ok;
}


export { getAllNotes, addNote, getAllUserNotes, getNote, deleteNote, login };
