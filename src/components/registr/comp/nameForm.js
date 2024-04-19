import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


function NameForm() {

    return (
        <Form.Group className="mb-3" controlId="fullName1">
            <Form.Label>ФИО</Form.Label>
            <Form.Control controlId="nameInput1" className="rrr" />
            <Form.Text hidden className="text-danger" id="nameHelp1">
                Введите ФИО
            </Form.Text>
        </Form.Group>
    );
};

export default NameForm;