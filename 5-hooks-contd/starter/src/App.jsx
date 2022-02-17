import React from "react";
import logo from './logo.svg';
import './App.css';
import NotesManager from "./components/NotesManager/NotesManager";

function App() {
    return (
        <div className="App">
            <img className={"App-logo"} src={logo}/>
            <NotesManager/>
        </div>
    );
}

export default App;
