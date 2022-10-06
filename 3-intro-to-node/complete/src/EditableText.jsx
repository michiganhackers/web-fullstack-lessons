import React, { useState } from "react";
import { randomColor } from "./utils";

function EditableText(props) {
  // size is the value you can read. it is only valid in this call
  //  setSize will set the value to be any value you want
  const [size, setSize] = useState(14);
  const [color, setColor] = useState("black");
  const [backgroundColor, setBackgroundColor] = useState("white");

  const handleIncreaseSize = () => setSize(size + 1);
  const handleDecreaseSize = () => setSize(size - 1);

  const handleChangeColor = (event) => {
    if (event.ctrlKey || event.metaKey) {
      setColor("black");
    } else {
      setColor(randomColor());
    }
  };

  const handleChangeBackgroundColor = (event) => {
    if (event.ctrlKey || event.metaKey) {
      setBackgroundColor("white");
    } else {
      setBackgroundColor(randomColor());
    }
  };

  return (
    <article>
      <p
        style={{
          fontSize: size,
          color: color,
          backgroundColor: backgroundColor,
        }}
      >
        Use the buttons to change me!
        <br />
        Current font size: {size}
        <br />
        Current color: {color}
      </p>
      <button onClick={handleIncreaseSize}>Increase Size</button>
      <button onClick={handleDecreaseSize}>Decrease Size</button>
      <button onClick={handleChangeColor}>Change Color</button>
      <button onClick={handleChangeBackgroundColor}>
        Change Background Color
      </button>
    </article>
  );
}

export default EditableText;
