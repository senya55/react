import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import EditGroupModal from '../editGroup';
import { useDispatch, useSelector } from "react-redux";
import { groupAPI } from '../../../../API/api';

function GroupCard(props) {
    const dispatch = useDispatch();

    const { id, name, isAdmin } = props;

    //для модального окна
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleEditGroup = () => {
        const nameOfEditGroup = document.getElementById('groupName3').value;
        //console.log(nameOfCreateCourse);
        const requestBody = {
            "name": nameOfEditGroup
        };
        dispatch(groupAPI.editGroup(requestBody, id));
        setShow(false);
    };

    const deleteGroup = () => {
        dispatch(groupAPI.deleteGroup(id));
    };
    return (
        <div className="border p-2 ps-3 d-flex justify-content-between align-items-center">
            <Nav.Link as={Link} to={`/listOfCourses/${id}`} onClick={() => dispatch(groupAPI.listOfGroupCourses(id, name))}>{name}</Nav.Link>
            {isAdmin && (
                <div>
                    <Button variant="warning" onClick={handleShow}>Редактировать</Button>
                    <Button variant="danger" className="ms-1" onClick={deleteGroup}>Удалить</Button>
                </div>
            )}

            <EditGroupModal show={show} handleClose={handleClose} handleEditGroup={handleEditGroup} name={name} />

        </div >
    );

}

export default GroupCard;