import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function EditMarkModal({ show, handleClose, handleEditMark, markType, nameOfStudent }) {
    const [selectedMark, setSelectedMark] = useState(""); // Состояние для хранения выбранного статуса 

    const handleRadioChange = (e) => {
        setSelectedMark(e.target.value); // Обновляем состояние при изменении выбора
    };

    let nameOfMarkType = '';
    switch (markType) {
        case "Midterm":
            nameOfMarkType = "Промежуточная аттестация";
            break;
        default:
            nameOfMarkType = "Финальная аттестация";
            break;
    }

    return (
        <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Изменение отметки для {nameOfMarkType}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <div><Form.Label>Студент - {nameOfStudent}</Form.Label></div>

                    <Form.Check
                        inline
                        label="Пройдено"
                        name="group1"
                        type='radio'
                        id={`passedStatus`}
                        value="Passed" // Значение для выбора
                        onChange={handleRadioChange} // Обработчик изменения выбора
                    />
                    <Form.Check
                        inline
                        label="Зафейлено"
                        name="group1"
                        type='radio'
                        id={`failedStatus`}
                        value="Failed" // Значение для выбора
                        onChange={handleRadioChange} // Обработчик изменения выбора
                    />

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Отмена
                </Button>
                <Button variant="primary" onClick={() => handleEditMark(selectedMark, markType)}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditMarkModal;