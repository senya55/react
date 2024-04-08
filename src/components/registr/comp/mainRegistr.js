import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";
import { wait } from "@testing-library/user-event/dist/utils";
import { userAPI } from "../../../API/api";

function MainRegistr() {
    const dispatch = useDispatch();
    const handleSubmit = async (event) => {
        event.preventDefault();

        const name = document.getElementById('fullName1').value;
        const birthDate = document.getElementById('birthDate1').value;
        const email = document.getElementById('email1').value;
        const password = document.getElementById('password1').value;
        const confirmPassword = document.getElementById('confirmPassword1').value;

        const requestBody = {
            "fullname": name,
            "birthDate": birthDate,
            "email": email,
            "password": password,
            "confirmPassword": confirmPassword
        };

        //проверка для имени(на пустое поле)
        if (name === null || name === "") {
            document.getElementById("nameHelp1").hidden = false;
            //console.log("000000  ", document.getElementById("nameInput1"))
            //document.getElementById("nameInput1").classList.add("is-invalid");
            //return;
        }

        else {
            document.getElementById("nameHelp1").hidden = true;
            //document.getElementById("nameInput1").classList.remove("is-invalid");
        }

        //проверка для дня рождения(на пустое поле)
        if (birthDate === null || birthDate === "") {
            document.getElementById("birthDateHelp1").hidden = false;
        }

        else {
            document.getElementById("birthDateHelp1").hidden = true;
        }

        //проверка для email
        if (email === null || email === "" || /\w+\@\w+\.\w+/.test(email) == false) {
            document.getElementById("emailHelp1").hidden = false;
            document.getElementById("emailHelpBlock1").hidden = true;

        }
        else {
            document.getElementById("emailHelp1").hidden = true;
            document.getElementById("emailHelpBlock1").hidden = false;

        }

        //проверка для пароля
        if (password === null || password === "" || password.length < 6) {
            document.getElementById("passwordHelp1").hidden = false;
            return;
        }
        else {
            document.getElementById("passwordHelp1").hidden = true;
        }

        //для подтверждения пароля
        if (confirmPassword === null || confirmPassword === "" || confirmPassword.length < 6) {
            document.getElementById("confirmPasswordHelp1").hidden = false;
            return;
        }
        else {
            document.getElementById("confirmPasswordHelp1").hidden = true;
        }
        await dispatch(userAPI.registr(requestBody));
        dispatch(userAPI.profile());
        console.log("Получение роли");
        dispatch(userAPI.role());

    };


    return (
        <div className="container text-start mt-4">
            <h1>Регистрация нового пользователя</h1>
            <Form onSubmit={handleSubmit} className="mt-3">
                <Form.Group className="mb-3" controlId="fullName1">
                    <Form.Label>ФИО</Form.Label>
                    <Form.Control controlId="nameInput1" className="rrr" />
                    <Form.Text hidden className="text-danger" id="nameHelp1">
                        Введите ФИО
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="birthDate1">
                    <Form.Label>День рождения</Form.Label>
                    <Form.Control
                        type="date"
                    />
                    <Form.Text hidden className="text-danger" id="birthDateHelp1">
                        Укажите дату рождения
                    </Form.Text>
                </Form.Group>
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
                <Form.Group className="mb-3" controlId="password1">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" />
                    <Form.Text hidden className="text-danger" id="passwordHelp1">
                        Пароль должен быть не менее 6 символов
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="confirmPassword1">
                    <Form.Label>Повторите пароль</Form.Label>
                    <Form.Control type="password" />
                    <Form.Text hidden className="text-danger" id="confirmPasswordHelp1">
                        Пароль должен быть не менее 6 символов
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Зарегистрироваться
                </Button>
            </Form>
        </div>
    );

}

export default MainRegistr;