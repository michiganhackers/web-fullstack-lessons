import React from 'react';

function EditableText(props) {
    return (
        <p style={{fontSize: props.fontSize, color: props.color, backgroundColor: props.backgroundColor}}>
            Use the buttons to change me!
        </p>
    );
}

export default EditableText;
