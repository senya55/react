import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import { useDispatch, useSelector } from "react-redux";
import CreateNoteModal from './modals/createNote';
import { useParams } from 'react-router-dom';
import { courseAPI, userAPI } from '../../../API/api';
import Note from './note';
import Badge from 'react-bootstrap/Badge';
import TeacherCard from './teacherCard';
import AddTeacherModal from './modals/addTeacher';
import { wait } from "@testing-library/user-event/dist/utils";
import StudentCard from './studentCard';

function ThirdBlock() {

    const dispatch = useDispatch();
    const { id } = useParams();

    const [selectedTab, setSelectedTab] = useState('#teachers'); // Состояние для отслеживания выбранной вкладки

    const handleTabSelect = (tab) => {
        setSelectedTab(tab);
    };

    const teachers = useSelector(state => state.courseReducer.courseDetails.teachers);
    const students = useSelector(state => state.courseReducer.courseDetails.students);
    // const notifications = useSelector(state => state.courseReducer.courseDetails.notifications);
    // console.log("кол-во ув-й ", notifications.length)

    const isAdmin = useSelector(state => state.userReduser.role.isAdmin);

    // const myEmail = useSelector(state => state.userReduser.profile.email);
    // const teachersOfThisCourse = useSelector(state => state.courseReducer.courseDetails.teachers);
    // const isTeacherOfThisCourse = teachersOfThisCourse.find((men) => men.email === myEmail);
    // console.log("Я учитель? ", isTeacherOfThisCourse);

    // //для модального окна создания уведомления
    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    // const handleCreateNote = (isImportant) => {
    //     //
    //     const note = document.getElementById('createNote1').value;
    //     //const isImportant = document.getElementById('isImportant1').value;
    //     //console.log("isImportant ", isImportant);
    //     const requestBody = {
    //         "text": note,
    //         "isImportant": isImportant
    //     };
    //     dispatch(courseAPI.createNote(id, requestBody));
    //     console.log("note ", note);
    //     setShow(false);
    // };
    //для модального окна создания уведомления
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = async () => {
        setShow(true);
        await dispatch(userAPI.teachers());; // Вызываем функцию при открытии модального окна
    };
    const handleAddTeacher = async () => {
        //
        const userId = document.getElementById('mainTeacherId3').value;
        // //const isImportant = document.getElementById('isImportant1').value;
        //console.log("userId ", userId);
        const requestBody = {
            "userId": userId
        };
        await dispatch(courseAPI.addTeacher(id, requestBody));
        dispatch(courseAPI.courseDetails(id));
        // console.log("note ", note);
        setShow(false);
    };
    const users = useSelector(state => state.userReduser.allUsers);
    console.log("teachhh ", users);

    return (
        <div className="mt-4">
            <Card>
                <Card.Header>
                    <Nav variant="tabs" defaultActiveKey="#teachers" fill>
                        <Nav.Item>
                            <Nav.Link
                                href="#teachers"
                                style={{ color: selectedTab === '#teachers' ? 'blue' : 'black', fontWeight: selectedTab === '#teachers' ? 'bold' : 'normal' }}
                                onClick={() => handleTabSelect('#teachers')}
                            >
                                Преподаватели
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                href="#students"
                                style={{ color: selectedTab === '#students' ? 'blue' : 'black', fontWeight: selectedTab === '#students' ? 'bold' : 'normal' }}
                                onClick={() => handleTabSelect('#students')}
                            >
                                Студенты
                            </Nav.Link>
                        </Nav.Item>
                        {/* <Nav.Item>
                            <Nav.Link
                                href="#notifications"
                                style={{ color: 'black', fontWeight: selectedTab === '#notifications' ? 'bold' : 'normal' }}
                                onClick={() => handleTabSelect('#notifications')}
                            >
                                Уведомления <Badge pill bg="danger">{notifications.length}</Badge>
                            </Nav.Link>
                        </Nav.Item> */}
                    </Nav>
                </Card.Header>
                <Card.Body>
                    {selectedTab === '#teachers' && (
                        <Card.Text>
                            {(isAdmin) && (
                                <div>
                                    <Button variant="primary" onClick={handleShow}>ДОБАВИТЬ ПРЕПОДАВАТЕЛЯ</Button>
                                </div>
                            )}
                            <AddTeacherModal show={show} handleClose={handleClose} handleAddTeacher={handleAddTeacher} users={users} />
                            {teachers.map((teacher, index) => (
                                <TeacherCard key={index} name={teacher.name} email={teacher.email} isMain={teacher.isMain} />
                            ))}
                        </Card.Text>
                    )}
                    {selectedTab === '#students' && (
                        <Card.Text>
                            {students.map((student, index) => (
                                <StudentCard key={index} name={student.name} email={student.email} status={student.status} studentId={student.id} midtermResult={student.midtermResult} finalResult={student.finalResult} />
                            ))}
                        </Card.Text>
                    )}
                    {/* {selectedTab === '#notifications' && (
                        <Card.Text>
                            {(isAdmin || isTeacherOfThisCourse) && (
                                <div>
                                    <Button variant="primary" onClick={handleShow}>СОЗДАТЬ УВЕДОМЛЕНИЕ</Button>
                                </div>
                            )}
                            <CreateNoteModal show={show} handleClose={handleClose} handleCreateNote={handleCreateNote} />
                            {notifications.map((notification, index) => (
                                <Note key={index} text={notification.text} isImportant={notification.isImportant} />
                            ))}
                        </Card.Text>
                    )} */}
                </Card.Body>
            </Card>
        </div >
    );

}

export default ThirdBlock;