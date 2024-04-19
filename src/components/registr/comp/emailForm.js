import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


function EmailForm() {

    return (
        <Form.Group className="mb-3" controlId="email1">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" />
            <Form.Text className="text-muted" id="emailHelpBlock1">
                Email будет использоваться для входа в систему
            </Form.Text>
            <Form.Text hidden className="text-danger" id="emailHelp1">
                Введите корректный Email
            </Form.Text>
        </Form.Group>
    );
};

export default EmailForm;