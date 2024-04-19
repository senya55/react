import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


function BirthDateForm() {

    return (
        <Form.Group className="mb-3" controlId="birthDate1">
            <Form.Label>День рождения</Form.Label>
            <Form.Control
                type="date"
            />
            <Form.Text hidden className="text-danger" id="birthDateHelp1">
                Укажите корректную дату рождения
            </Form.Text>
        </Form.Group>
    );
};

export default BirthDateForm;