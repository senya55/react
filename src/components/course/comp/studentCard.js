import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { courseAPI } from '../../../API/api';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import EditMarkModal from './modals/editMark';

function StudentCard(props) {

    const { name, email, status, studentId, midtermResult, finalResult } = props;
    let color = '';
    let studentStatus = '';

    let colorOfMidtermResult = '';
    let midtermResultWord = '';

    let colorOfFinalResult = '';
    let finalResultWord = '';

    switch (status) {
        case "InQueue":
            color = "blue";
            studentStatus = "в очереди";
            break;
        case "Accepted":
            color = "green";
            studentStatus = "принят в группу";
            break;
        case "Declined":
            color = "red";
            studentStatus = "отклонен";
            break;
        default:
            color = "grey";
            studentStatus = "???????";
            break;
    }

    switch (midtermResult) {
        case "Passed":
            colorOfMidtermResult = "success";
            midtermResultWord = "успешно пройдена";
            break;
        case "Failed":
            colorOfMidtermResult = "danger";
            midtermResultWord = "зафейлена";
            break;
        default:
            colorOfMidtermResult = "secondary";
            midtermResultWord = "отметки нет";
            break;
    }

    switch (finalResult) {
        case "Passed":
            colorOfFinalResult = "success";
            finalResultWord = "успешно пройдена";
            break;
        case "Failed":
            colorOfFinalResult = "danger";
            finalResultWord = "зафейлена";
            break;
        default:
            colorOfFinalResult = "secondary";
            finalResultWord = "отметки нет";
            break;
    }


    const dispatch = useDispatch();
    const { id } = useParams();

    const myEmail = useSelector(state => state.userReduser.profile.email);
    const teachersOfThisCourse = useSelector(state => state.courseReducer.courseDetails.teachers);
    const isTeacherOfThisCourse = teachersOfThisCourse.find((men) => men.email === myEmail);

    const isAdmin = useSelector(state => state.userReduser.role.isAdmin);

    const editStudentStatus = (studentStatus) => {
        const requestBody = {
            "status": studentStatus
        };
        //console.log("requestBody33 ", id);
        dispatch(courseAPI.editStudentStatus(id, studentId, requestBody));

    }

    let meOrNotMe = false;
    if (email === myEmail) {
        meOrNotMe = true;
    }

    //для модального окна создания уведомления
    const [markType, setMarkType] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = async (type) => {
        setMarkType(type);
        setShow(true);
    };
    const handleEditMark = async (selectedMark, markType) => {
        const requestBody = {
            "markType": markType,
            "mark": selectedMark
        };
        dispatch(courseAPI.editMark(id, studentId, requestBody));
        console.log("selectedMark ", requestBody);
        setShow(false);
    };

    return (
        <div >
            <hr />
            <div>
                <Row>
                    <Col>
                        <div>
                            <div>
                                {name}
                            </div>
                            <div style={{ color: "grey" }}>
                                Статус -
                                <span style={{ color: color }}>{studentStatus}</span>

                            </div>
                            <div style={{ color: "grey" }}>
                                {email}
                            </div>
                        </div>
                    </Col>

                    {(status === "Accepted" && (isTeacherOfThisCourse || isAdmin)) && (
                        <>
                            <Col>
                                <Nav.Link eventKey="second" style={{ color: 'blue' }} onClick={() => handleShow("Midterm")}>Промежуточная аттестация - <Badge bg={colorOfMidtermResult} >{midtermResultWord}</Badge></Nav.Link>

                            </Col>
                            <Col>
                                <Nav.Link eventKey="second" style={{ color: 'blue' }} onClick={() => handleShow("Final")}>Финальная аттестация - <Badge bg={colorOfFinalResult}>{finalResultWord}</Badge></Nav.Link>

                            </Col>
                        </>
                    )}

                    {(status === "Accepted" && meOrNotMe && !isAdmin) && (
                        <>
                            <Col>
                                Промежуточная аттестация - <Badge bg={colorOfMidtermResult} >{midtermResultWord}</Badge>

                            </Col>
                            <Col>
                                Финальная аттестация - <Badge bg={colorOfFinalResult}>{finalResultWord}</Badge>

                            </Col>
                        </>
                    )}

                    <EditMarkModal show={show} handleClose={handleClose} handleEditMark={handleEditMark} markType={markType} nameOfStudent={name} />

                    {(status === "InQueue" && (isTeacherOfThisCourse || isAdmin)) && (
                        <Col className='d-flex justify-content-end'>
                            <Button variant="primary" onClick={() => editStudentStatus("Accepted")}>принять</Button>
                            <Button className='ms-1' variant="danger" onClick={() => editStudentStatus("Declined")}>отклонить заявку</Button>
                        </Col>
                    )}
                </Row>

            </div>

        </div >
    );

}

export default StudentCard;