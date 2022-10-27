import React from "react";
import "./Note.css";
import {formatDate} from "utils";


function Note(props) {
    const dateString = formatDate(props.note.dateCreated);
    return (
        <article className={`${props.note?.completed ? "Note completed" : "Note"}`}>
            <div className="header">
                {/*we group these headers together so they appear vertically*/}
                <div>
                    <h3 className="no-margin">{props.note?.title}</h3>
                    <h6 className="no-margin">{dateString}</h6>
                </div>
                <div>
                    <button onClick={props.deleteFunction}>Remove</button>
                    <button onClick={props.markCompleteFunction} disabled={props.note?.completed}>Mark Complete</button>
                </div>
            </div>
            <p>{props.note?.body}</p>
        </article>
    );
}

export default Note;
