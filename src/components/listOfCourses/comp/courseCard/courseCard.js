import React from "react";
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

const CourseCard = ({ course }) => {
    let statusColor = ''; // Переменная для хранения цвета текста в зависимости от статуса курса

    // Определение цвета текста в зависимости от статуса курса
    switch (course.status) {
        case 'Created':
            statusColor = 'text-secondary'; // Серый цвет
            break;
        case 'Started':
            statusColor = 'text-primary'; // Синий цвет
            break;
        case 'OpenForAssigning':
            statusColor = 'text-success'; // Зеленый цвет
            break;
        case 'Finished':
            statusColor = 'text-danger'; // Красный цвет
            break;
        default:
            statusColor = 'text-secondary'; // По умолчанию серый цвет
    }
    const id = course.id;
    return (

        <Nav.Link as={Link} to={`/courses/${id}/details`} className="border p-2 ps-3 d-flex justify-content-between ">
            <div>
                <h5>{course.name}</h5>
                <div>Учебный год - {course.startYear}</div>
                <div>Семестр - {course.semester}</div>
                <div className="text-secondary">Мест всего - {course.maximumStudentsCount}</div>
                <div className="text-secondary">Мест свободно - {course.remainingSlotsCount}</div>
            </div>
            <div className={statusColor}>
                {course.status}
            </div>
        </Nav.Link >
    );
}

export default CourseCard;