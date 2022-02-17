import React from "react";
import "./Note.css";

const dateOptions = {
    timeStyle: "medium",
    dateStyle: "medium",
};

function Note(props) {
    const dateString = props.note.dateCreated.toLocaleString([], dateOptions);
    return (
        <article className="Note">
            <div className="header">
                {/*we group these headers together so they appear vertically*/}
                <div>
                    <h3 className="no-margin">{props.note?.title}</h3>
                    <h6 className="no-margin">{dateString}</h6>
                </div>
                <button onClick={props.deleteFunction}>Remove</button>
            </div>
            <p>{props.note?.body}</p>
        </article>
    );
}

export default Note;
