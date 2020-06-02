import React from 'react';
import {
    Col, Row
} from 'react-bootstrap'
import Pos from "../../components/Pos/Pos"
const POS = (props) => {
    return (
        <div>
            <Row>
                <Col md={1}></Col>
                <Col md={10}>
                </Col>
                <Col md={1}></Col>
            </Row>
            <Row>
                <Col md={1}></Col>
                <Col md={10}>
                    <Pos />
                </Col>
                <Col md={1}></Col>
            </Row>
        </div>
    );
};

export default POS;