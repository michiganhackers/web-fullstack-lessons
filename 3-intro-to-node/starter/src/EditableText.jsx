import React, { useState } from "react";
import { randomColor } from "./utils";

function EditableText(props) {
  // size is the value you can read. it is only valid in this call
  //  setSize will set the value to be any value you want
  const [size, setSize] = useState(14);

  const handleIncreaseSize = () => setSize(size + 1);

  return (
    <article>
      <p
        style={{
          fontSize: size,
        }}
      >
        Use the buttons to change me!
      </p>
      <button onClick={handleIncreaseSize}>Increase Size</button>
    </article>
  );
}

export default EditableText;
