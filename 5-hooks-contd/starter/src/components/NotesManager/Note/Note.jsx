import React from "react";
import "./Note.css";

const dateOptions = {
    timeStyle: "medium",
    dateStyle: "medium",
};

function Note(props) {
    return (
        <article className="Note">
            <div className="header">
                {/*we group these headers together so they appear vertically*/}
                <div>
                    <h3 className="no-margin">{props.note?.title}</h3>
                </div>
            </div>
            <p>{props.note?.body}</p>
        </article>
    );
}

export default Note;
