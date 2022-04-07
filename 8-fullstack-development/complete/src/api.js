async function getAllNotes() {
    const res = await fetch("/api/notes", {
        credentials: "include",
        mode: "cors",
    });
    if (!res.ok) {
        return [];
    }
    return await res.json();
}

async function getAllUserNotes(username) {
    const res = await fetch(`/api/${username}/notes`, {
        credentials: "include",
        mode: "cors",
    });
    if (!res.ok) {
        return [];
    }
    return await res.json();
}

async function getNote(note_id) {
    const res = await fetch(`/api/notes/${note_id}`, {
        credentials: "include",
        mode: "cors",
    });
    return await res.json();
}

async function addNote(title, body) {
    const res = await fetch("/api/notes/", {
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
            title,
            body,
        }),
        method: "POST",
        mode: "cors",
        credentials: "include",
    });
    if (!res.ok) {
        return { id: null };
    }
    return await res.json();
}

async function deleteNote(note_id) {
    const res = await fetch(`/api/notes/${note_id}`, {
        method: "DELETE",
        mode: "cors",
        credentials: "include",
    });
    return res.ok;
}

async function login(username, password) {
    const res = await fetch("/api/login", {
        headers: {
            "content-type": "application/json",
            "accept-type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
        }),
        credentials: "include",
        method: "POST",
        mode: "cors",
    });
    return res.ok;
}

export { getAllNotes, addNote, getAllUserNotes, getNote, deleteNote, login };
