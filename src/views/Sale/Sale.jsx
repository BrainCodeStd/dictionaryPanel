import React from 'react';
import { Tab, Row, Col, Nav, NavItem } from 'react-bootstrap';
import RegisterationForm from "../../components/ItemRegisterationForm/ItemRegisterationForm"
import { useEffect } from 'react';
import Sale from '../../components/Sale/Sale'
import _ from 'lodash'
import { getQuery } from '../../misc/helper'
const Courier = (props) => {
    useEffect(() => {
        if (!getQuery().tab)
            props.history.push(`${props.match.path}?tab=register`)
    }, [])
    return (
        <div>
            <Row></Row>
            <Tab.Container id="tabs-with-dropdown" defaultActiveKey={getQuery().tab ? getQuery().tab : "register"}>

                <Row className="clearfix">
                    <Col sm={12} className="tabular">
                        <Nav bsStyle="tabs" className="bgtbs">
                            <NavItem eventKey="register" onClick={() => {
                                props.history.push(`${props.match.path}?tab=register`)
                            }}>Register Word</NavItem>
                            <NavItem eventKey="view" onClick={() => {
                                props.history.push(`${props.match.path}?tab=view`)
                            }}>View</NavItem>
                        </Nav>
                    </Col>
                    <Col sm={12}>
                        <Tab.Content animation>
                            <Tab.Pane eventKey="register">
                                <RegisterationForm />
                            </Tab.Pane>
                            <Tab.Pane eventKey="view">
                                <Sale />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    );
};

export default Courier;