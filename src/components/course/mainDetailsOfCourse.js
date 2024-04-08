import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";
//import { courseAPI } from "../../API/api";
import { useParams } from 'react-router-dom';
import { courseAPI } from '../../API/api';
import FirstBlock from './comp/firstBlock';
import SecondBlock from './comp/secondBlock';
import ThirdBlock from './comp/thirdBlock';

function MainDetailsOfCourse() {

    const dispatch = useDispatch();
    const { id } = useParams();
    console.log(id);

    dispatch(courseAPI.courseDetails(id));
    const name = useSelector(state => state.courseReducer.courseDetails.name);
    console.log("название курса", name);

    return (
        <div className="container text-start mt-4">
            <h1>{name}</h1>
            <FirstBlock />
            <SecondBlock />
            <ThirdBlock />

        </div>
    );

}

export default MainDetailsOfCourse;