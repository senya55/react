import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { courseAPI, userAPI } from '../../../API/api';
import { wait } from "@testing-library/user-event/dist/utils";
import ConfirmationWindowModal from '../../confirmationWindow';
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";

function DeleteButtonBlock() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const isAdmin = useSelector(state => state.userReduser.role.isAdmin);

    //для модального окна подтверждения удаления
    const [showConfirm, setShowConfirm] = useState(false);
    const handleCloseConfirm = () => setShowConfirm(false);
    const handleShowConfirm = () => setShowConfirm(true);

    const handleConfirm = () => {
        deleteCourse();
        setShowConfirm(false);
    };

    const deleteCourse = () => {
        try {
            const data = dispatch(courseAPI.deleteCourse(id));
            swal({
                text: "Курс удален (˚ ˃̣̣̥⌓˂̣̣̥ )づ♡",
                timer: 3000
            });
            navigate("/groups");
        } catch (error) {
            console.log(error);
        }


    };


    return (
        <div className="mt-4 mb-4">
            {(isAdmin) && (<Button variant="danger" className="ms-1" onClick={handleShowConfirm}>Удалить курс ദ്ദി ༎ຶ‿༎ຶ )</Button>)}

            <ConfirmationWindowModal showConfirm={showConfirm} handleCloseConfirm={handleCloseConfirm} handleConfirm={handleConfirm} groupOrCourse="данный курс" />
        </div >
    );

}

export default DeleteButtonBlock;