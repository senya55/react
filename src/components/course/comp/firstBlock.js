import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch, useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';
import EditStatusModal from './modals/editStatus';
import { useParams } from 'react-router-dom';
import { courseAPI } from '../../../API/api';

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


    //для модального окна
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleEditStatus = (selectedStatus) => {
        //
        //const status = document.getElementById('openForAssigningStatus').value;
        const requestBody = {
            "status": selectedStatus
        };
        dispatch(courseAPI.editStatus(requestBody, id));
        //console.log("selectedStatus ", selectedStatus);
        setShow(false);
    };

    return (
        <div>
            <Row>
                <Col><h5 className="mt-4">Основные данные курса</h5></Col>
                <Col>
                    {(isAdmin || isTeacher) && (
                        <div className='d-flex justify-content-end mt-2'>
                            <Button variant="warning">РЕДАКТИРОВАТЬ</Button>
                        </div>
                    )}

                </Col>
            </Row>

            <div className="card">
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <Row>
                            <Col><div className="fw-bold">Статус курса</div>
                                <div>{status}</div></Col>
                            <Col>
                                {(isAdmin || isTeacher) && (

                                    <div className='d-flex justify-content-end'>
                                        <Button variant="warning" onClick={handleShow}>ИЗМЕНИТЬ</Button>
                                    </div>
                                )
                                }
                                {(status === "OpenForAssigning") && (
                                    <div className='d-flex justify-content-end'>
                                        <Button variant="success" onClick={() => dispatch(courseAPI.signUpForCourse(id))}>ЗАПИСАТЬСЯ НА КУРС</Button>
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