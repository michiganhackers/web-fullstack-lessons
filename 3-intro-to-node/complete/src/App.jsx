import React from "react";
import logo from "./logo.svg";
import "./App.css";
import DynamicButtons from "./DynamicButtons";
import EditableText from "./EditableText";

function App() {
  return (
    <div className="App">
      <img className={"App-logo"} src={logo} />
      <EditableText />
      <DynamicButtons />
    </div>
  );
}

export default App;
