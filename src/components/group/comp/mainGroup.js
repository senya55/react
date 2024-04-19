import React, { useState, useEffect } from 'react';
import GroupCard from "./groupCard/cardOfGroup";
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";
import { groupAPI } from "../../../API/api";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import CreateGroupModal from './createGroup';


function MainGroup() {

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Получение списка групп");
        dispatch(groupAPI.listOfGroups());
    })
    const groups = useSelector(state => state.groupReducer.listOfGroups);
    const isAdmin = useSelector(state => state.userReduser.role.isAdmin);
    //console.log("ttttttt", groups);

    //для модального окна
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCreateGroup = () => {
        const nameOfCreateGroup = document.getElementById('groupName2').value;
        //console.log(nameOfCreateCourse);
        const requestBody = {
            "name": nameOfCreateGroup
        };
        dispatch(groupAPI.createGroup(requestBody));

        setShow(false);
    };

    return (
        <div className="container text-start mt-4">
            <h1>Группы кампусных курсов</h1>
            {isAdmin && (
                <Button variant="primary" onClick={handleShow}>Создать</Button>
            )}

            <CreateGroupModal show={show} handleClose={handleClose} handleCreateGroup={handleCreateGroup} />

            <div className="mt-4">
                {groups.map((group, index) => (
                    <GroupCard key={index} id={group.id} name={group.name} isAdmin={isAdmin} />
                ))}
            </div>

        </div>
    );

}

export default MainGroup;