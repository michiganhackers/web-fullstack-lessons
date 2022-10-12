import React, {useState, useEffect} from "react";
import Note from "./Note/Note.jsx";
import "./NotesManager.css";

function Notes() {
    const [notes, setNotes] = useState([{
        title: "hi",
        body: "name"
        // TODO: add another property for each note
    }]);

    // TODO: add a state variable for a new note

    const addNote = () => {
        const newData = prompt("Enter some new data");
        console.log({newData});
        // only copies in old values right now
        setNotes([...notes
            // TODO: add entered data to the notes state
        ]);
    };

    // TODO: add a function that removes a note at a certain index

    // only run once at component creation
    useEffect(() => {
        console.log("I run on mount");
        console.log(`Notes were last updated on ${localStorage.getItem("lastUpdateTime")}`);
    }, []);

    // every time the notes are updated, save the last time they were updated
    useEffect(() => {
        localStorage.setItem("lastUpdateTime", new Date().toISOString());
        // TODO: save the notes variable as a JSON string to local storage
        // then, when the page is first loaded, read the data from local storage
    }, [notes]);

    return (
        <>
            <div className="inputs">
                {/* TODO: add another input for the note title */}
                <label>
                    Body:&nbsp;
                    <input
                    // TODO: add attributes to this input so it corresponds
                    // with the new note state variable
                    />
                </label>
                <button onClick={addNote}
                    // TODO: make this button disabled if either of the inputs
                    // are blank
                >
                    Add Note
                </button>
            </div>
            <div className="Notes">
                {/* TODO: read from the notes variable using .map
                    instead of these hardcoded values
                */}
                <Note note={{body: "body", title: "title"}}/>
                <Note note={{body: "more body", title: "more title"}}/>
            </div>
        </>
    );
}

export default Notes;
