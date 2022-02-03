import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import EditableText from "./EditableText";
import {randomColor} from "./utils";

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

// Normally, you would not write React code like this, but since we are not showing state until next week
//  we are going to use this approach
let fontSize = 12;

// Do not use this a reference for proper React Code. This is mainly to show JSX.
setInterval(() =>
        ReactDOM.render(
            <React.StrictMode>
                <EditableText fontSize={`${fontSize}px`}/>
                <button onClick={() => ++fontSize}>Increase Font Size</button>
            </React.StrictMode>,
            document.getElementById("editable-text")
        ),
    100);

