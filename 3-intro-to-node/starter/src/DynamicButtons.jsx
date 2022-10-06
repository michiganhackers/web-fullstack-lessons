import React, { useState } from "react";
import "./App.css";

function DynamicButtons(props) {
  const [buttons, setButtons] = useState([]);
  const [lastIndex, setLastIndex] = useState(0);

  // add a new button id to the button array
  const addButton = () => {
    setButtons([...buttons, lastIndex]);
    setLastIndex(lastIndex + 1);
  };

  // delete the button with the given id
  const deleteButton = (buttonId) =>
    setButtons(buttons.filter((id) => id !== buttonId));

  return (
    <div className={"buttons"}>
      <h3>Dynamic Buttons!</h3>
      <button>Add More!</button>
      {/* Add dynamic buttons here using `map` */}
    </div>
  );
}

export default DynamicButtons;
