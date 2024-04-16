import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';

function TeacherCard(props) {

    const { name, email, isMain } = props;

    return (
        <div>
            <hr />
            <div style={{ fontWeight: "bold" }}>
                {name}
                {(isMain === true) && (<Badge bg="success" className='ms-2'>основной</Badge>)}

            </div>
            <div style={{ color: "grey" }}>
                {email}
            </div>





        </div >
    );

}

export default TeacherCard;