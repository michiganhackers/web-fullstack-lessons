import React, {useState} from 'react';
import "./App.css";

function DynamicButtons(props) {
    // This uses its own state to handle things
    const [buttons, setButtons] = useState([])
    const [lastIndex, setLastIndex] = useState(0)

    const addButton = () => {
        setButtons([...buttons, lastIndex]);
        setLastIndex(lastIndex+1);
    }
    return (
        <div>
            <button onClick={addButton}>Add More!</button>
            {buttons.map(id => (
                <button onClick={() => setButtons(buttons.filter(btnId => btnId !== id))}>
                    Button {id}
                </button>
            ))}
        </div>
    );
}

export default DynamicButtons;
