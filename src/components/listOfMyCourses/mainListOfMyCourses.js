import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";
import { courseAPI } from "../../API/api";
import CourseCard from '../listOfCourses/comp/courseCard/courseCard';

function MainListOfMyCourses() {

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Получение списка моих курсов");
        dispatch(courseAPI.listOfMyCourses());
    })
    const myCourses = useSelector(state => state.courseReducer.listOfMyCourses);
    // const isAdmin = useSelector(state => state.userReduser.role.isAdmin);
    console.log("ttttttt", myCourses);

    return (
        <div className="container text-start mt-4">
            <h1>Мои курсы</h1>
            {/* {isAdmin && (
                <Button variant="primary">Создать</Button>
            )}

            <div className="mt-4">
                {groups.map((group, index) => (
                    <GroupCard key={index} id={group.id} name={group.name} isAdmin={isAdmin} />
                ))}
            </div> */}
            <div className="mt-4">
                {myCourses.map((course, index) => (
                    <CourseCard key={index} course={course} /> // Передаем данные курса в компонент CourseCard
                ))}
            </div>

        </div>
    );

}

export default MainListOfMyCourses;