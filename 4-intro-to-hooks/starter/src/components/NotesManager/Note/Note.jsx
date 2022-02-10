import React from "react";
import "./Note.css";


function Note(props) {
    return (
        <article className="Note">
            <p>{props.note?.body}</p>
            <button onClick={console.log}>Action</button>
        </article>
    );
}

export default Note;
