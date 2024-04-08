import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";
import { courseAPI } from "../../API/api";
import CourseCard from '../listOfCourses/comp/courseCard/courseCard';

function MainListOfTeachingCourses() {

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Получение списка преподаваемых курсов");
        dispatch(courseAPI.listOfTeachingCourses());
    })
    const teachingCourses = useSelector(state => state.courseReducer.listOfTeachingCourses);

    console.log("ttttttt", teachingCourses);

    return (
        <div className="container text-start mt-4">
            <h1>Преподаваемые курсы</h1>
            {/* {isAdmin && (
                <Button variant="primary">Создать</Button>
            )}

            <div className="mt-4">
                {groups.map((group, index) => (
                    <GroupCard key={index} id={group.id} name={group.name} isAdmin={isAdmin} />
                ))}
            </div> */}
            <div className="mt-4">
                {teachingCourses.map((course, index) => (
                    <CourseCard key={index} course={course} /> // Передаем данные курса в компонент CourseCard
                ))}
            </div>

        </div>
    );

}

export default MainListOfTeachingCourses;