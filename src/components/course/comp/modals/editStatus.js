import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function EditStatusModal({ show, handleClose, handleEditStatus }) {
    // Состояние для хранения выбранного статуса 
    const [selectedStatus, setSelectedStatus] = useState("");

    // Обновляем состояние при изменении выбора
    const handleRadioChange = (e) => {
        setSelectedStatus(e.target.value);
    };
    return (
        <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Изменение статуса курса</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Check
                        inline
                        label="Открыт для записи"
                        name="group1"
                        type='radio'
                        id={`openForAssigningStatus`}
                        value="OpenForAssigning" // Значение для выбора
                        onChange={handleRadioChange} // Обработчик изменения выбора
                    />
                    <Form.Check
                        inline
                        label="В процессе"
                        name="group1"
                        type='radio'
                        id={`startedStatus`}
                        value="Started" // Значение для выбора
                        onChange={handleRadioChange} // Обработчик изменения выбора
                    />
                    <Form.Check
                        inline
                        label="Завершен"
                        name="group1"
                        type='radio'
                        id={`finishedStatus`}
                        value="Finished" // Значение для выбора
                        onChange={handleRadioChange} // Обработчик изменения выбора

                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Отмена
                </Button>
                <Button variant="primary" onClick={() => handleEditStatus(selectedStatus)}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditStatusModal;