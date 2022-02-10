import React, { useState, useEffect } from "react";
import Note from "./Note/Note.jsx";
import "./NotesManager.css";

function Notes() {
    const [notes, setNotes] = useState([
        { title: "hi", body: "name", dateCreated: new Date() },
    ]);

    const [newNote, setNewNote] = useState({
        title: "",
        body: "",
        dateCreated: new Date(),
    });

    const addNote = () => {
        // update the notes list and set the creation time of the newest note to now
        setNotes([{ ...newNote, dateCreated: new Date() }, ...notes]);
        // clear out the new note form
        setNewNote({
            title: "",
            body: "",
            dateCreated: new Date(),
        });
    };

    // remove the given note and update the state
    const removeNote = (index) =>
        // keep all notes except for the once matching the index
        setNotes(notes.filter((_, i) => index !== i));

    // only run once at component creation
    useEffect(() => {
        // try to load any saved notes
        //  if there are no saved notes, then parse an empty array
        const savedNotes = JSON.parse(localStorage.getItem("notes") ?? "[]");
        savedNotes.forEach(
            (note) => (note.dateCreated = new Date(note.dateCreated))
        );
        if (savedNotes?.length) {
            setNotes(savedNotes);
        }
    }, []);

    // every time the notes are updated, save to local storage
    //  it doesn't matter what updates them
    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    return (
        <>
            <div className="inputs">
                <label>
                    Title:&nbsp;
                    <input
                        value={newNote.title}
                        onChange={(event) =>
                            setNewNote({ ...newNote, title: event.target.value })
                        }
                    />
                </label>
                <label>
                    Body:&nbsp;
                    <input
                        value={newNote.body}
                        onChange={(event) =>
                            setNewNote({ ...newNote, body: event.target.value })
                        }
                    />
                </label>
                <button onClick={addNote} disabled={!newNote.body && !newNote.title}>
                    Add Note
                </button>
            </div>
            <div className="Notes">
                {notes.map((note, i) => (
                    // using the unique field (time) as the update hint
                    <Note
                        note={note}
                        deleteFunction={() => removeNote(i)}
                        key={note.dateCreated}
                    />
                ))}
            </div>
        </>
    );
}

export default Notes;
