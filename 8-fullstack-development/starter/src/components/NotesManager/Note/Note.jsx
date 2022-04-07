import React from "react";
import "./Note.css";

const dateOptions = {
    timeStyle: "medium",
    dateStyle: "medium",
};

function Note(props) {
    const {note, deleteFunction, markCompleteFunction} = props;
    const dateString = note.created.toLocaleString([], dateOptions);
    return (
        <article className={`${note?.completed ? "Note completed" : "Note"}`} id={note.id}>
            <div className="header">
                {/*we group these headers together so they appear vertically*/}
                <div>
                    <h3 className="no-margin">{note?.title}</h3>
                    <h5 className="no-margin username">{note?.username}</h5>
                    <h6 className="no-margin">{dateString}</h6>
                </div>
                <button onClick={deleteFunction}>Remove</button>
                <button onClick={markCompleteFunction} disabled={note?.completed}>Mark Complete</button>
            </div>
            <p>{note?.body}</p>
        </article>
    );
}

export default Note;
