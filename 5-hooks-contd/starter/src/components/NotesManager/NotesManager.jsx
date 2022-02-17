import React, { useState, useEffect } from "react";
import Note from "./Note/Note.jsx";
import "./NotesManager.css";

function Notes() {
    const [notes, setNotes] = useState([
        { title: "hi", body: "name" },
    ]);

    const [newNote, setNewNote] = useState({
        title: "",
        body: ""
    });

    const addNote = () => {
        // update the notes list and set the creation time of the newest note to now
        setNotes([newNote, ...notes]);
        // clear out the new note form
        setNewNote({
            title: "",
            body: ""
        });
    };

    // TODO: add a useEffect call that updates local storage every time our notes 
    // state changes

    // TODO: add another useEffect that only runs ONCE that pulls our saved notes from
    // local storage and updates our notes state accordingly

    // TODO: define a function that deletes a note at a given index. Each note should 
    // contain a button that, when clicked, calls that function defined here
    // (see "Lifting State Up" in the slides)

    // TODO: add another property to the notes, such as date created or background color

    // TODO: add another button to each note that does something else, such as marking
    // complete or duplicating

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
                    {/* TODO: add another input that updates newNote's body */}
                </label>
                <button 
                    onClick={addNote} 
                    // TODO: add a disabled attribute here that depends on whether
                    // the inputs are both empty
                >
                    Add Note
                </button>
            </div>
            <div className="Notes">
                {notes.map((note) => (
                    <Note
                        note={note}
                        // TODO: add your removing note function attribute here
                        // TODO: add your other button function attribute here
                    />
                ))}
            </div>
        </>
    );
}

export default Notes;
