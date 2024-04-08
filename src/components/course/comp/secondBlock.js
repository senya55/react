import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import { useDispatch, useSelector } from "react-redux";

function SecondBlock() {
    const [selectedTab, setSelectedTab] = useState('#first'); // Состояние для отслеживания выбранной вкладки

    const handleTabSelect = (tab) => {
        setSelectedTab(tab);
    };

    const requirements = useSelector(state => state.courseReducer.courseDetails.requirements);
    const annotations = useSelector(state => state.courseReducer.courseDetails.annotations);

    return (
        <div className="mt-4">
            <Card>
                <Card.Header>
                    <Nav variant="tabs" defaultActiveKey="#requirements">
                        <Nav.Item>
                            <Nav.Link
                                href="#requirements"
                                style={{ color: 'black', fontWeight: selectedTab === '#requirements' ? 'bold' : 'normal' }}
                                onClick={() => handleTabSelect('#requirements')}
                            >
                                Требования к курсу
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                href="#annotations"
                                style={{ color: 'black', fontWeight: selectedTab === '#annotations' ? 'bold' : 'normal' }}
                                onClick={() => handleTabSelect('#annotations')}
                            >
                                Аннотация
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                href="#notifications"
                                style={{ color: 'black', fontWeight: selectedTab === '#notifications' ? 'bold' : 'normal' }}
                                onClick={() => handleTabSelect('#notifications')}
                            >
                                Уведомления
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Card.Header>
                <Card.Body>
                    {selectedTab === '#requirements' && (
                        <Card.Text>
                            {requirements}
                        </Card.Text>
                    )}
                    {selectedTab === '#annotations' && (
                        <Card.Text>
                            {annotations}
                        </Card.Text>
                    )}
                    {selectedTab === '#notifications' && (
                        <Card.Text>
                            Текущие уведомления
                        </Card.Text>
                    )}
                </Card.Body>
            </Card>
        </div >
    );
}

export default SecondBlock;