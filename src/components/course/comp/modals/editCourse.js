import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from "react-redux";
import MyWysiwygEditor from '../../../myWysiwygEditor';

function EditCourseModal({ showEditCourse, handleCloseEditCourse, handleEditCourse, teachers }) {
    const isAdmin = useSelector(state => state.userReduser.role.isAdmin);
    const { name, startYear, maximumStudentsCount, semester, requirements, annotations, mainTeacherId } = useSelector(state => state.courseReducer.courseDetails);
    //для требований
    const [editorRequirements, setEditorRequirements] = useState('');

    const handleRequirementsChange = (newRequirements) => {
        setEditorRequirements(newRequirements);
    };

    //для аннотаций
    const [editorAnnotations, setEditorAnnotations] = useState('');

    const handleAnnotationsChange = (newAnnotations) => {
        setEditorAnnotations(newAnnotations);
    };


    const [selectedSemester, setSelectedSemester] = useState(semester); // Состояние для хранения выбранного статуса 

    const handleRadioChange = (e) => {
        setSelectedSemester(e.target.value); // Обновляем состояние при изменении выбора
    };
    return (
        <Modal size="lg" show={showEditCourse} onHide={handleCloseEditCourse}>
            <Modal.Header closeButton>
                <Modal.Title>Редактирование курса</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {(isAdmin) && (
                        <>
                            <Form.Group className="mb-3" controlId="courseName2">
                                <Form.Label>Название курса</Form.Label>
                                <Form.Control
                                    type="text"
                                    defaultValue={name}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="startYear2">
                                <Form.Label>Год начала курса</Form.Label>
                                <Form.Control
                                    type="number"
                                    defaultValue={startYear}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="maximumStudentsCount2">
                                <Form.Label>Общее количество мест</Form.Label>
                                <Form.Control
                                    type="number"
                                    defaultValue={maximumStudentsCount}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="semester2">
                                <Form.Label>Семестр</Form.Label>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <Form.Check
                                        inline
                                        label="Осенний"
                                        name="group2"
                                        type='radio'
                                        id={`autumnStatus`}
                                        value="Autumn" // Значение для выбора
                                        onChange={handleRadioChange} // Обработчик изменения выбора
                                        defaultChecked={semester === "Autumn"}
                                    />
                                    <Form.Check
                                        inline
                                        label="Весенний"
                                        name="group2"
                                        type='radio'
                                        id={`springStatus`}
                                        value="Spring" // Значение для выбора
                                        onChange={handleRadioChange} // Обработчик изменения выбора
                                        defaultChecked={semester === "Spring"}
                                    />
                                </div>
                            </Form.Group>
                        </>
                    )}
                    <Form.Group className="mb-3" controlId="requirements2">
                        <Form.Label>Требования</Form.Label>
                        <MyWysiwygEditor onContentChange={handleRequirementsChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="annotations2">
                        <Form.Label>Аннотации</Form.Label>
                        <MyWysiwygEditor onContentChange={handleAnnotationsChange} />
                    </Form.Group>
                    {(isAdmin) && (
                        <Form.Group className="mb-3" controlId="mainTeacherId2">
                            <Form.Label>Основной преподаватель курса</Form.Label>
                            <Form.Select aria-label="Default select example" value={mainTeacherId}>
                                {teachers.map((teacher, index) => (
                                    <option key={index} value={teacher.id}>{teacher.fullName}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>)}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEditCourse}>
                    Отмена
                </Button>
                <Button variant="primary" onClick={() => handleEditCourse(selectedSemester, editorRequirements, editorAnnotations)}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditCourseModal;