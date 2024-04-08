import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import MyWysiwygEditor from '../../myWysiwygEditor';


function CreateCourseModal({ show, handleClose, saveCourse, teachers }) {

    const [editorContent, setEditorContent] = useState('');

    const handleContentChange = (newContent) => {
        setEditorContent(newContent);
    };
    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Создание курса</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="courseName1">
                        <Form.Label>Название курса</Form.Label>
                        <Form.Control
                            type="text"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="startYear1">
                        <Form.Label>Год начала курса</Form.Label>
                        <Form.Control
                            type="number"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="maximumStudentsCount1">
                        <Form.Label>Общее количество мест</Form.Label>
                        <Form.Control
                            type="number"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="semester1">
                        <Form.Label>Семестр</Form.Label>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <Form.Check type="radio" label="Осенний" />
                            <span style={{ marginLeft: "10px" }}>
                                <Form.Check type="radio" label="Весенний" />
                            </span>
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="requirements1">
                        <Form.Label>Требования</Form.Label>
                        <MyWysiwygEditor onContentChange={handleContentChange} />
                        <p>{editorContent}</p>
                    </Form.Group>
                    {/* <Form.Group className="mb-3" controlId="annotations1">
                        <Form.Label>Аннотации</Form.Label>
                        <MyWysiwygEditor />
                    </Form.Group> */}
                    <Form.Group className="mb-3" controlId="mainTeacherId1">
                        <Form.Label>Основной преподаватель курса</Form.Label>
                        <Form.Select aria-label="Default select example">
                            {teachers.map((teacher, index) => (
                                <option key={index} value={teacher.id}>{teacher.fullName}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Отмена
                </Button>
                <Button variant="primary" onClick={saveCourse}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateCourseModal;