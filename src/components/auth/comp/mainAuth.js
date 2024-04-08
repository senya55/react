import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";
import { wait } from "@testing-library/user-event/dist/utils";
import { userAPI } from "../../../API/api";


function MainAuth() {
    const dispatch = useDispatch();
    const handleSubmit = async (event) => {
        //предотвращает стандартное поведение отправки формы,
        //чтобы страница не перезагружалась при отправке
        event.preventDefault();

        const email = document.getElementById('email2').value;
        const password = document.getElementById('password2').value;

        const requestBody = {
            "email": email,
            "password": password
        };

        //проверка для email
        if (email === null || email === "" || /\w+\@\w+\.\w+/.test(email) == false) {
            document.getElementById("emailHelp2").hidden = false;
        }
        else {
            document.getElementById("emailHelp2").hidden = true;
        }

        //проверка для пароля
        if (password === null || password === "" || password.length < 6) {
            document.getElementById("passwordHelp2").hidden = false;
            document.getElementById("notCorrectPasswordOrEmail1").hidden = true;
            return;
        }
        else {
            document.getElementById("passwordHelp2").hidden = true;
        }
        await dispatch(userAPI.login(requestBody));
        dispatch(userAPI.profile());
        console.log("Получение роли");
        dispatch(userAPI.role());

    };

    return (
        <div className="container text-start mt-4">
            <h1>Авторизация</h1>
            <Form onSubmit={handleSubmit} className="mt-3">
                <Form.Group className="mb-3" controlId="email2">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" />
                    <Form.Text hidden className="text-danger" id="emailHelp2">
                        Введите корректный Email
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password2">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" />
                    <Form.Text hidden className="text-danger" id="passwordHelp2">
                        Пароль должен быть не менее 6 символов
                    </Form.Text>
                    <Form.Text hidden className="text-danger" id="notCorrectPasswordOrEmail1">
                        Неверный email или пароль
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Войти
                </Button>
            </Form>
        </div>
    );

}

export default MainAuth;