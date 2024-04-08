import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './header.css'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { userAPI } from '../../API/api';


const MainHeader = () => {
    const profileState = useSelector(state => state.userReduser);
    const isTeacher = useSelector(state => state.userReduser.role.isTeacher);
    const isStudent = useSelector(state => state.userReduser.role.isStudent);

    console.log(profileState);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     console.log("Получение роли");
    //     dispatch(userAPI.role());
    // })

    return (
        <Navbar bg="secondary" data-bs-theme="dark">
            <div className='w-100'>
                <Navbar expand="lg" className="bg-secondary">
                    <Container fluid>
                        <Navbar.Brand href="#home">Кампусные курсы</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">

                                {(profileState.isAuth === 0) ? (
                                    <>
                                    </>
                                ) : (
                                    <>
                                        <Nav.Link as={Link} to="/groups">Группы курсов</Nav.Link>
                                        {isStudent && <Nav.Link as={Link} to="/courses/my">Мои курсы</Nav.Link>}
                                        {isTeacher && <Nav.Link as={Link} to="/courses/teaching">Преподаваемые курсы</Nav.Link>}
                                    </>
                                )}


                            </Nav>

                            <Nav className='mx-0'>
                                {(profileState.isAuth === 0) ? (
                                    <>
                                        <Nav.Link as={Link} to="/registration">Регистрация</Nav.Link>
                                        <Nav.Link as={Link} to="/login">Вход</Nav.Link>
                                    </>
                                ) : (
                                    <>
                                        <Nav.Link as={Link} to="/profile">{profileState.profile.fullName}</Nav.Link>
                                        <Nav.Link as={Link} to="/" onClick={() => dispatch(userAPI.logout())}>Выход</Nav.Link>
                                    </>
                                )}

                            </Nav>

                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </Navbar>
    )

}

export default MainHeader;