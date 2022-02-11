import React, {useState, useEffect} from "react";
import Note from "./Note/Note.jsx";
import "./NotesManager.css";

function Notes() {
    const [notes, setNotes] = useState([
        {title: "hi", body: "name"},
    ]);


    const addNote = () => {
        const newData = prompt("Enter some new data");
        console.log({newData});
        // only copies in old values right now
        setNotes([...notes]);
    };

    // only run once at component creation
    useEffect(() => {
        console.log("I run on mount");
        console.log(`Notes were last updated on ${localStorage.getItem("lastUpdateTime")}`);
    }, []);

    // every time the notes are updated, save the last time they were updated
    useEffect(() => {
        localStorage.setItem("lastUpdateTime", new Date().toISOString());
    }, [notes]);

    return (
        <>
            <div className="inputs">
                <label>
                    Body:&nbsp;
                    <input/>
                </label>
                <button onClick={addNote}>
                    Add Note
                </button>
            </div>
            <div className="Notes">
                <Note note={{body: "body", title: "title"}}/>
                <Note note={{body: "more body", title: "more title"}}/>
            </div>
        </>
    );
}

export default Notes;
