import React from "react";
import logo from "./logo.svg";
import "./App.css";
import EditableText from "./EditableText";

function App() {
  return (
    <div className="App">
      <img className={"App-logo"} src={logo} />
      <EditableText />
    </div>
  );
}

export default App;
