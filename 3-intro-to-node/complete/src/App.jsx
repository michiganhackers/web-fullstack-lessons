import React from "react";
import logo from "./logo.svg";
import "./App.css";
import DynamicButtons from "./DynamicButtons";
import EditableText from "./EditableText";
import { ClimbingBoxLoader } from "react-spinners";

function App() {
  return (
    <div className="App">
      <img className={"App-logo"} src={logo} />
      <div style={{display: "flex", justifyContent: "center"}}>
        <ClimbingBoxLoader />
      </div>
      <EditableText />
      <DynamicButtons />
    </div>
  );
}

export default App;
