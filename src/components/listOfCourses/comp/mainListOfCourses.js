import React, { useState, useEffect } from "react";
import CourseCard from "./courseCard/courseCard";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import { courseAPI, groupAPI, userAPI } from "../../../API/api";
import { useDispatch, useSelector } from "react-redux";
import CreateCourseModal from "./createCourse";
import { wait } from "@testing-library/user-event/dist/utils";

const MainListOfCourses = () => {

    const dispatch = useDispatch();
    //const [courses, setCourses] = useState([]);

    //для модального окна
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = async () => {
        setShow(true);
        await dispatch(userAPI.teachers());; // Вызываем функцию при открытии модального окна
    };


    //при сохранении курса(создании)
    const saveCourse = async (selectedSemester, editorRequirements, editorAnnotations) => {
        await createCourse(selectedSemester, editorRequirements, editorAnnotations);
        setShow(false);
        // Вызываем функцию при открытии модального окна
    };

    const createCourse = async (selectedSemester, editorRequirements, editorAnnotations) => {
        const name = document.getElementById('courseName1').value;
        const startYear = document.getElementById('startYear1').value;
        const maximumStudentsCount = document.getElementById('maximumStudentsCount1').value;
        const mainTeacherId = document.getElementById('mainTeacherId1').value;
        const requestBody = {
            "name": name,
            "startYear": startYear,
            "maximumStudentsCount": maximumStudentsCount,
            "semester": selectedSemester,
            "requirements": editorRequirements,
            "annotations": editorAnnotations,
            "mainTeacherId": mainTeacherId
        };
        await dispatch(courseAPI.createCourse(id, requestBody));
        dispatch(groupAPI.listOfGroupCourses(id, nameOfGroup));
        //console.log("данные: ", requestBody)

    };

    const teachers = useSelector(state => state.userReduser.allUsers);

    //заменить потом на норм ид
    const { id } = useParams();


    const courses = useSelector(state => state.groupReducer.specificGroup.listOfGroupCourses);
    const nameOfGroup = useSelector(state => state.groupReducer.specificGroup.nameOfGroup);
    const isAdmin = useSelector(state => state.userReduser.role.isAdmin);
    console.log("NAME OF GROUP ", nameOfGroup);
    // useEffect(() => {
    //     dispatch(groupAPI.listOfGroupCourses(id, nameOfGroup));

    // }, []);


    return (
        <div className="container text-start mt-4">
            <h1>Группa - {nameOfGroup}</h1>
            {isAdmin &&
                <Button className="mt-3" variant="primary" onClick={handleShow}>СОЗДАТЬ КУРС</Button>}

            {/* модальное окно для создания курса(только для админа) */}
            <CreateCourseModal show={show} handleClose={handleClose} saveCourse={saveCourse} teachers={teachers} />

            <div className="mt-4">
                {courses.map((course, index) => (
                    <CourseCard key={index} course={course} /> // Передаем данные курса в компонент CourseCard
                ))}
            </div>

        </div>
    );
}

export default MainListOfCourses;