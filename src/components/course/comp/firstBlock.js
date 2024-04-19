import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch, useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';
import EditStatusModal from './modals/editStatus';
import { useParams } from 'react-router-dom';
import { courseAPI, userAPI } from '../../../API/api';
import EditCourseModal from './modals/editCourse';
import { wait } from "@testing-library/user-event/dist/utils";

function FirstBlock() {
    const dispatch = useDispatch();
    const { id } = useParams();

    const status = useSelector(state => state.courseReducer.courseDetails.status);
    const semester = useSelector(state => state.courseReducer.courseDetails.semester);
    const startYear = useSelector(state => state.courseReducer.courseDetails.startYear);
    const maximumStudentsCount = useSelector(state => state.courseReducer.courseDetails.maximumStudentsCount);
    const studentsEnrolledCount = useSelector(state => state.courseReducer.courseDetails.studentsEnrolledCount);
    const studentsInQueueCount = useSelector(state => state.courseReducer.courseDetails.studentsInQueueCount);

    const isAdmin = useSelector(state => state.userReduser.role.isAdmin);
    const isTeacher = useSelector(state => state.userReduser.role.isTeacher);

    //я учитель этого курса или нет
    const myEmail = useSelector(state => state.userReduser.profile.email);
    const teachersOfThisCourse = useSelector(state => state.courseReducer.courseDetails.teachers);
    const isTeacherOfThisCourse = teachersOfThisCourse.find((men) => men.email === myEmail);
    //const isTeacherOfThisCourse = 
    console.log("Я учитель? ", isTeacherOfThisCourse);

    //я студент этого курса или нет
    const studentsOfThisCourse = useSelector(state => state.courseReducer.courseDetails.students);
    const isStudentOfThisCourse = studentsOfThisCourse.find((men) => men.email === myEmail);


    //для модального окна редактирования статуса
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleEditStatus = (selectedStatus) => {

        const requestBody = {
            "status": selectedStatus
        };
        dispatch(courseAPI.editStatus(requestBody, id));

        setShow(false);
    };


    const [showEditCourse, setShowEditCourse] = useState(false);
    const handleCloseEditCourse = () => setShowEditCourse(false);
    const handleShowEditCourse = async () => {
        setShowEditCourse(true);
        // Вызываем функцию при открытии модального окна
        await dispatch(userAPI.teachers());;
    };

    const handleEditCourse = async (selectedSemester, editorRequirements, editorAnnotations) => {
        await editCourse(selectedSemester, editorRequirements, editorAnnotations);
        setShowEditCourse(false);

    };

    const editCourse = async (selectedSemester, editorRequirements, editorAnnotations) => {
        if (isAdmin) {
            console.log("admin");
            const name = document.getElementById('courseName2').value;
            const startYear = document.getElementById('startYear2').value;
            const maximumStudentsCount = document.getElementById('maximumStudentsCount2').value;

            const requestBody = {
                "name": name,
                "startYear": startYear,
                "maximumStudentsCount": maximumStudentsCount,
                "semester": selectedSemester,
                "requirements": editorRequirements,
                "annotations": editorAnnotations,
                "mainTeacherId": "776668a5-c65d-41da-12ce-08db2e8acafa"
            };
            console.log("данные: ", requestBody)
            dispatch(courseAPI.editCourse(id, requestBody));

        }
        else {
            console.log("user just");
            const requestBody = {
                "requirements": editorRequirements,
                "annotations": editorAnnotations
            };
            console.log("данные: ", requestBody);
            dispatch(courseAPI.editRequirementsAndAnnotations(id, requestBody));

        }

    };
    const teachers = useSelector(state => state.userReduser.allUsers);

    const sighUpForCourse = async () => {
        const requestBody = {

        };
        await dispatch(courseAPI.signUpForCourse(id, requestBody));
        dispatch(userAPI.role());
    }

    let statusColor = '';
    let statusText = '';

    // Определение цвета текста в зависимости от статуса курса
    switch (status) {
        case 'Created':
            statusColor = 'text-secondary';
            statusText = 'Создан';
            break;
        case 'Started':
            statusColor = 'text-primary';
            statusText = 'В процессе обучения';
            break;
        case 'OpenForAssigning':
            statusColor = 'text-success';
            statusText = 'Открыт для записи';
            break;
        case 'Finished':
            statusColor = 'text-danger';
            statusText = 'Закрыт';
            break;
        default:
            statusColor = 'text-secondary';
            statusText = '?????';
    }

    return (
        <div>
            <Row>
                <Col><h5 className="mt-4">Основные данные курса</h5></Col>
                <Col>
                    {(isAdmin || isTeacherOfThisCourse) && (
                        <div className='d-flex justify-content-end mt-2'>
                            <Button variant="warning" onClick={handleShowEditCourse}>РЕДАКТИРОВАТЬ</Button>
                        </div>
                    )}
                    <EditCourseModal showEditCourse={showEditCourse} handleCloseEditCourse={handleCloseEditCourse} handleEditCourse={handleEditCourse} teachers={teachers} />

                </Col>
            </Row>

            <div className="card">
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <Row>
                            <Col><div className="fw-bold">Статус курса</div>
                                <div className={statusColor}>{statusText}</div></Col>
                            <Col>
                                {(isAdmin || isTeacherOfThisCourse) && (

                                    <div className='d-flex justify-content-end'>
                                        <Button variant="warning" onClick={handleShow}>ИЗМЕНИТЬ</Button>
                                    </div>
                                )
                                }
                                {(status === "OpenForAssigning" && !isTeacherOfThisCourse && !isStudentOfThisCourse) && (
                                    <div className='d-flex justify-content-end mt-1'>
                                        <Button variant="success" onClick={() => sighUpForCourse()}>ЗАПИСАТЬСЯ НА КУРС</Button>
                                    </div>
                                )}
                                {(!isAdmin && !isTeacherOfThisCourse && isStudentOfThisCourse) && (
                                    <div className='d-flex justify-content-end mt-2' style={{ color: 'green' }}>
                                        Вы участник данного курса
                                    </div>
                                )}
                                <EditStatusModal show={show} handleClose={handleClose} handleEditStatus={handleEditStatus} />

                            </Col>

                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col><div className="fw-bold">Учебный год</div>
                                <div>{startYear}</div></Col>
                            <Col><div className="fw-bold">Семестр</div>
                                <div>{semester}</div></Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col><div className="fw-bold">Всего мест</div>
                                <div>{maximumStudentsCount}</div></Col>
                            <Col><div className="fw-bold">Студентов зачислено</div>
                                <div>{studentsEnrolledCount}</div></Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className="fw-bold">Заявок на рассмотрение</div>
                        <div>{studentsInQueueCount}</div>
                    </ListGroup.Item>
                </ListGroup>
            </div>
        </div>
    );

}

export default FirstBlock;