import React from 'react';
import './Display.scss';

const Display = ({ value }) => {
    // destruct value 

    const displayValue = JSON.stringify(value, null, 2);

    return (
        <div className="Display">
            <h3>Outputs</h3>
            {displayValue.length > 3 ? <pre>{displayValue}</pre> : ""}
        </div>
    );
}

export default Display;
