import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


function AddTeacherModal({ show, handleClose, handleAddTeacher, users }) {

    return (
        <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Добавление преподавателя на курс</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form.Group className="mb-3" controlId="mainTeacherId3">
                    <Form.Label>Выберите преподавателя</Form.Label>
                    <Form.Select>
                        {users.map((user, index) => (
                            <option key={index} value={user.id}>{user.fullName}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Отмена
                </Button>
                <Button variant="primary" onClick={() => handleAddTeacher()}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddTeacherModal;