import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { courseAPI, userAPI } from '../../../API/api';
import TeacherCard from './teacherCard';
import AddTeacherModal from './modals/addTeacher';
import { wait } from "@testing-library/user-event/dist/utils";
import StudentCard from './studentCard';

function ThirdBlock() {

    const dispatch = useDispatch();
    const { id } = useParams();

    // Состояние для отслеживания выбранной вкладки
    const [selectedTab, setSelectedTab] = useState('#teachers');

    const handleTabSelect = (tab) => {
        setSelectedTab(tab);
    };

    const teachers = useSelector(state => state.courseReducer.courseDetails.teachers);
    const students = useSelector(state => state.courseReducer.courseDetails.students);


    const isAdmin = useSelector(state => state.userReduser.role.isAdmin);

    const myEmail = useSelector(state => state.userReduser.profile.email);
    const teachersOfThisCourse = useSelector(state => state.courseReducer.courseDetails.teachers);
    const isMainTeacherOfThisCourse = teachersOfThisCourse.find((men) => (men.email === myEmail && men.isMain));


    //для модального окна создания уведомления
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = async () => {
        setShow(true);
        // Вызываем функцию при открытии модального окна
        await dispatch(userAPI.teachers());;
    };
    const handleAddTeacher = async () => {

        const userId = document.getElementById('mainTeacherId3').value;

        const requestBody = {
            "userId": userId
        };
        dispatch(courseAPI.addTeacher(id, requestBody));

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

                    </Nav>
                </Card.Header>
                <Card.Body>
                    {selectedTab === '#teachers' && (
                        <Card.Text>
                            {(isAdmin || isMainTeacherOfThisCourse) && (
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

                </Card.Body>
            </Card>
        </div >
    );

}

export default ThirdBlock;