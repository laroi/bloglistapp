import React, { useState } from 'react';
const toggleVisibility = (setVisible, visible) => {
    return () =>  setVisible(!visible);
};

const Togglable = (props) => {
    const [visible, setVisible] = useState(false);
    const hideWhenVisible = { display: visible ? 'none' : '' };
    const showWhenVisible = { display: visible ? '' : 'none' };
    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility(setVisible, visible)}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible} className="togglableContent">
                {props.children}
                <button onClick={toggleVisibility(setVisible, visible)}>cancel</button>
            </div>
        </div>
    );
};
export default Togglable;
