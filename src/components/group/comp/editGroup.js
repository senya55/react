import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function EditGroupModal({ show, handleClose, handleEditGroup, name }) {
    return (
        <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Редактирование группы</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="groupName3">
                        <Form.Label>Название группы</Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={name}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Отмена
                </Button>
                <Button variant="primary" onClick={handleEditGroup}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditGroupModal;