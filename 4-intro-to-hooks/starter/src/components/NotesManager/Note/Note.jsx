import React from "react";
import "./Note.css";


function Note(props) {
    return (
        <article className="Note">
            {/* TODO: display the note's title */}
            <p>{props.note?.body}</p>
            {/* TODO: edit this button so it deletes the note */}
            <button onClick={console.log}>Action</button>
            {/* TODO: add some other property to the note */}
        </article>
    );
}

export default Note;
