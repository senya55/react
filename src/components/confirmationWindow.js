import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function ConfirmationWindowModal({ showConfirm, handleCloseConfirm, handleConfirm, groupOrCourse }) {

    return (
        <Modal show={showConfirm} onHide={handleCloseConfirm}>
            <Modal.Header closeButton>
                <Modal.Title>Удалить {groupOrCourse}?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    Отменить это действие будет невозможно 💔
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseConfirm}>
                    Отмена
                </Button>
                <Button variant="danger" onClick={handleConfirm}>
                    Удалить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmationWindowModal;