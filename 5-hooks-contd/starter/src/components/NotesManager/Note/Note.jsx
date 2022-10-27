import React from "react";
import "./Note.css";

function Note(props) {
    return (
        <article className="Note">
            <div className="header">
                <div>
                    <h3 className="no-margin">{props.note?.title}</h3>
                </div>
                <div>
                    <button onClick={console.log}>Action</button>
                    {/* TODO: add buttons here */}
                </div>
            </div>
            <p>{props.note?.body}</p>
        </article>
    );
}

export default Note;
