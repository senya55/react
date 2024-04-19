import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";
import { wait } from "@testing-library/user-event/dist/utils";
import { userAPI } from "../../API/api";
import swal from 'sweetalert';
import { loginActionCreator } from "../../reducers/user-reducer";
import { useNavigate } from "react-router-dom";
import BirthDateForm from "./comp/birthDateForm";
import EmailForm from "./comp/emailForm";
import NameForm from "./comp/nameForm";
import PasswordForm from "./comp/passwordForm";

function MainRegistr() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
            return;
        }

        else {
            document.getElementById("nameHelp1").hidden = true;
        }

        //проверка для дня рождения(на пустое поле)
        if (birthDate === null || birthDate === "" || birthDate < "1900-01-01") {
            document.getElementById("birthDateHelp1").hidden = false;
            return;
        }

        else {
            document.getElementById("birthDateHelp1").hidden = true;
            console.log("EEEEEErimeevo ", birthDate);
        }

        const today = new Date();
        const formattedToday = today.toISOString().slice(0, 10);

        if (birthDate > formattedToday) {
            swal("Дата рождения не может быть в будущем");
            return;
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
        if (password === null || password === "" || password.length < 6 || password.length > 32) {
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

        if (confirmPassword != password) {
            swal("Неверное подтверждение пароля");
            return;
        }

        try {
            const data = await dispatch(userAPI.registr(requestBody));
            localStorage.setItem("token", data.token);
            dispatch(loginActionCreator());
            navigate("/groups");
        } catch (error) {
            console.log(error);
        }


        dispatch(userAPI.profile());
        console.log("Получение роли");
        dispatch(userAPI.role());

    };


    return (
        <div className="container text-start mt-4">
            <h1>Регистрация нового пользователя</h1>
            <Form onSubmit={handleSubmit} className="mt-3">
                <NameForm />
                <BirthDateForm />
                <EmailForm />
                <PasswordForm lable={"Пароль"} idForm={"password1"} idFormHelp={"passwordHelp1"} />
                <PasswordForm lable={"Повторите пароль"} idForm={"confirmPassword1"} idFormHelp={"confirmPasswordHelp1"} />

                <Button variant="primary" type="submit">
                    Зарегистрироваться
                </Button>
            </Form>
        </div>
    );

}

export default MainRegistr;