import React from "react";
import logo from "./logo.svg";
import "./App.css";
import NotesManager from "./components/NotesManager/NotesManager";
import Login from "./components/Login/Login";

function App() {
    return (
        <div className="App">
            <Login />
            <img className={"App-logo"} src={logo} />
            <NotesManager />
        </div>
    );
}

export default App;
