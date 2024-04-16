import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';

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