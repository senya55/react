import React, { useState, useEffect } from 'react';

function Note(props) {

    const { text, isImportant } = props;

    return (
        <div>
            <hr />
            {(isImportant) ? (
                <div className='text-danger'>{text}</div>
            ) : (
                <div>{text}</div>
            )}
        </div >
    );

}

export default Note;