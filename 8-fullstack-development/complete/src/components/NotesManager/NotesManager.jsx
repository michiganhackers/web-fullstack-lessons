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
        const { id } = await addNote(inprogressNote.title, inprogressNote.body);
        if (id === null) {
            // something went wrong
            return;
        }
        // get the new data to display
        // you can just get all note again, but that's wasteful when you only need one
        const newNote = await getNote(id);
        // update the notes list and set the creation time of the newest note to now
        setNotes([newNote, ...notes]);
        // clear out the new note form
        setInprogressNote({
            title: "",
            body: "",
            completed: false,
        });
    };

    // remove the given note by sending a request and only update locally if the removal was successful
    const removeNote = async (index) => {
        // keep all notes except for the once matching the index
        const { id } = notes[index];
        (await deleteNote(id)) && setNotes(notes.filter((_, i) => index !== i));
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
                notes.map((note) => ({
                    ...note,
                    created: new Date(note.created),
                }))
            )
            // we want highest ids (newest) first
            .then((notes) => setNotes(notes.reverse()));
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
