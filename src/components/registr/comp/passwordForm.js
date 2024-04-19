import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';


function PasswordForm({ lable, idForm, idFormHelp }) {

    return (
        <Form.Group className="mb-3" controlId={idForm}>
            <Form.Label>{lable}</Form.Label>
            <Form.Control type="password" />
            <Form.Text hidden className="text-danger" id={idFormHelp}>
                Пароль должен быть не менее 6 символов
            </Form.Text>
        </Form.Group>
    );
};

export default PasswordForm;