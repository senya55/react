import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch, useSelector } from "react-redux";
import { userAPI } from "../../API/api";

function MainProfile() {
    const dispatch = useDispatch();
    const fullName = useSelector(state => state.userReduser.profile.fullName);
    const email = useSelector(state => state.userReduser.profile.email);
    const birthDate = useSelector(state => state.userReduser.profile.birthDate);
    const onlyDate = birthDate.split("T")[0];

    useEffect(() => {
        console.log("Получение данных профиля");
        dispatch(userAPI.profile());
    })


    const handleEdit = (event) => {
        event.preventDefault();
        const fullName = document.getElementById('fullNameEdit').value;
        const birthDate = document.getElementById('birthDateEdit').value;

        const requestBody = {
            "fullName": fullName,
            "birthDate": birthDate
        };
        dispatch(userAPI.editProfile(requestBody));
        console.log("сохранить изменения", fullName);
    }

    return (
        <div className="container text-start mt-4">
            <h1>Профиль</h1>
            <Form onSubmit={handleEdit} className="mt-3">
                <Form.Group as={Row} className="mb-3" controlId="fullNameEdit">
                    <Form.Label column sm={2}>ФИО</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            defaultValue={fullName}

                        />
                        <Form.Text hidden className="text-danger" id="nameHelp2">
                            Введите ФИО
                        </Form.Text>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                    <Form.Label column sm={2}>Email</Form.Label>
                    <Col sm={10}>
                        <Form.Text className="text-dark">{email}</Form.Text>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="birthDateEdit">
                    <Form.Label column sm={2}>День рождения</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="date"
                            defaultValue={onlyDate}

                        />
                        <Form.Text hidden className="text-danger" id="birthDateHelp2">
                            Укажите дату рождения
                        </Form.Text>
                    </Col>
                </Form.Group>
                <div className="d-flex justify-content-end">
                    <Button variant="primary" type="submit">
                        Изменить
                    </Button>
                </div>
            </Form>
        </div>
    );

}

export default MainProfile;