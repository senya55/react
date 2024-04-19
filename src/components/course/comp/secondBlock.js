import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import { useDispatch, useSelector } from "react-redux";
import CreateNoteModal from './modals/createNote';
import { useParams } from 'react-router-dom';
import { courseAPI } from '../../../API/api';
import Note from './note';
import Badge from 'react-bootstrap/Badge';

function SecondBlock() {
    const dispatch = useDispatch();
    const { id } = useParams();

    // Состояние для отслеживания выбранной вкладки
    const [selectedTab, setSelectedTab] = useState('#requirements');

    const handleTabSelect = (tab) => {
        setSelectedTab(tab);
    };

    const requirements = useSelector(state => state.courseReducer.courseDetails.requirements);
    const annotations = useSelector(state => state.courseReducer.courseDetails.annotations);
    const notifications = useSelector(state => state.courseReducer.courseDetails.notifications);
    console.log("кол-во ув-й ", notifications.length)

    const isAdmin = useSelector(state => state.userReduser.role.isAdmin);

    const myEmail = useSelector(state => state.userReduser.profile.email);
    const teachersOfThisCourse = useSelector(state => state.courseReducer.courseDetails.teachers);
    const isTeacherOfThisCourse = teachersOfThisCourse.find((men) => men.email === myEmail);
    console.log("Я учитель? ", isTeacherOfThisCourse);

    //для модального окна создания уведомления
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCreateNote = (isImportant) => {

        const note = document.getElementById('createNote1').value;

        const requestBody = {
            "text": note,
            "isImportant": isImportant
        };
        dispatch(courseAPI.createNote(id, requestBody));
        console.log("note ", note);
        setShow(false);
    };

    return (
        <div className="mt-4">
            <Card>
                <Card.Header>
                    <Nav variant="tabs" defaultActiveKey="#requirements">
                        <Nav.Item>
                            <Nav.Link
                                href="#requirements"
                                style={{ color: 'black', fontWeight: selectedTab === '#requirements' ? 'bold' : 'normal' }}
                                onClick={() => handleTabSelect('#requirements')}
                            >
                                Требования к курсу
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                href="#annotations"
                                style={{ color: 'black', fontWeight: selectedTab === '#annotations' ? 'bold' : 'normal' }}
                                onClick={() => handleTabSelect('#annotations')}
                            >
                                Аннотация
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                href="#notifications"
                                style={{ color: 'black', fontWeight: selectedTab === '#notifications' ? 'bold' : 'normal' }}
                                onClick={() => handleTabSelect('#notifications')}
                            >
                                Уведомления <Badge pill bg="danger">{notifications.length}</Badge>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Card.Header>
                <Card.Body>
                    {selectedTab === '#requirements' && (
                        //dangerouslySetInnerHTML используется чтобы рендерить HTML содержимое без экранирования(тегов)
                        //представляет угрозу безопасности 0_0
                        <Card.Text dangerouslySetInnerHTML={{ __html: requirements }} />
                    )}
                    {selectedTab === '#annotations' && (
                        <Card.Text dangerouslySetInnerHTML={{ __html: annotations }} />
                    )}
                    {selectedTab === '#notifications' && (
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
                    )}
                </Card.Body>
            </Card>
        </div >
    );
}

export default SecondBlock;