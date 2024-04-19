import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';


function CreateNoteModal({ show, handleClose, handleCreateNote }) {

    const [isImportant, setIsImportant] = useState(false); // Состояние для отслеживания выбора чекбокса 

    const handleCheckboxChange = (event) => {
        setIsImportant(event.target.checked);
    }// Устанавливаем состояние в соответствии с выбором чекбокса 
    return (
        <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Создание уведомления</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FloatingLabel controlId="createNote1">
                        <Form.Control
                            as="textarea"
                            style={{ height: '120px' }}
                        />
                    </FloatingLabel>
                </Form>
                <Form.Check className='mt-3'
                    type='checkbox'
                    id="isImportant1"
                    label="Уведомление с высокой важностью"
                    checked={isImportant} // Устанавливаем состояние чекбокса 
                    onChange={handleCheckboxChange} // Обработчик изменения состояния чекбокса 

                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Отмена
                </Button>
                <Button variant="primary" onClick={() => handleCreateNote(isImportant)}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateNoteModal;