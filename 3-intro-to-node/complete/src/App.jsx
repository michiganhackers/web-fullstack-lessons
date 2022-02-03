import React from "react";
import logo from './logo.svg';
import './App.css';
import DynamicButtons from "./DynamicButtons";

function App() {
    return (
        <div className="App">
            <img className={"App-logo"} src={logo}/>
            <DynamicButtons/>
        </div>
    );
}

export default App;
