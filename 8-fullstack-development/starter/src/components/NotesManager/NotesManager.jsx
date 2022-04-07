import React, { useState, useEffect } from "react";
import Note from "./Note/Note.jsx";
import "./NotesManager.css";
import { getAllNotes, getNote, addNote, deleteNote } from "../../api";

function Notes() {
    const [notes, setNotes] = useState([]);

    const [inprogressNote, setInprogressNote] = useState({
        title: "",
        body: "",
        completed: false,
    });

    const handleAddNote = async () => {

    };

    // remove the given note by sending a request and only update locally if the removal was successful
    const removeNote = async (index) => {

    };

    const markComplete = (i) => {
        let new_notes = [...notes];
        new_notes[i].completed = true;
        console.log(new_notes);
        setNotes(new_notes);
    };

    // only run once at component creation
    useEffect(() => {
        // try to load any saved notes
        //  if there are no saved notes, then parse an empty array
        getAllNotes()
            .then((notes) =>
                // deserialized dates
                notes.map((note) => ({
                    ...note,
                    created: new Date(note.created),
                }))
            )
            // TODO: update the notes
            .then(

            );
    }, []);

    return (
        <>

            <div className="inputs">
                <label>
                    Title:&nbsp;
                    <input
                        value={inprogressNote.title}
                        onChange={(event) =>
                            setInprogressNote({
                                ...inprogressNote,
                                title: event.target.value,
                            })
                        }
                    />
                </label>
                <label>
                    Body:&nbsp;
                    <input
                        value={inprogressNote.body}
                        onChange={(event) =>
                            setInprogressNote({
                                ...inprogressNote,
                                body: event.target.value,
                            })
                        }
                    />
                </label>
                <button
                    onClick={handleAddNote}
                    disabled={!inprogressNote.body && !inprogressNote.title}
                >
                    Add Note
                </button>
            </div>
            <div className="Notes">
                {notes.map((note, i) => (
                    // using the unique field (time) as the update hint
                    <Note
                        note={note}
                        deleteFunction={() => removeNote(i)}
                        markCompleteFunction={() => markComplete(i)}
                        key={note.id}
                    />
                ))}
            </div>
        </>
    );
}

export default Notes;
