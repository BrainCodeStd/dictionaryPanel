import React, { useState } from 'react';
import { Col, Row, Modal} from "react-bootstrap";
import Card from '../Card/Card';
import ReactTable from "react-table";
import "react-table/react-table.css";
const EditQuiz = (prop) => {
    const[obj]=useState({})
    const[view,setView]=useState(false)

    const {data}=prop; 

    let record = data ? data.map((element) => {
        return {
            salePrice: element.salePrice,            
            barcode: element.barcode,
            name: element.name,
            quantity:element.quantity?element.quantity:"-"
            // <MiniTableButton text={element.quantity?element.quantity:"-"} handleClick={() => {
               
            //     setObj({barcode:element.barcode,stockIn:element.quantity?element.quantity:0})
            //     setView(true)
            // }} />
            
        }
    }) : []
    const columns = [
        {
            Header: "Barcode",
            accessor: "barcode",
            sortable: false
        },
        {
            Header: "Name",
            accessor: "name",
            sortable: false
        },
        {
            Header: "Quantity",
            accessor: "quantity",
            sortable: false
        },
        {
            Header: "Price",
            accessor: "salePrice",
            sortable: false
        }
    ]
    return (<div>

    
        <Modal show={prop.show} onHide={prop.handleClose} bsSize="lg">
            <Modal.Header className="mdhead" closeButton >
                <Modal.Title>Search BarCode</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={12}>

                        <Row>
                            <Card
                                content={
                                    <ReactTable
                                        data={record}
                                        columns={columns}
                                        loading={false}
                                        className="-striped -highlight"
                                        showPagination={false}
                                        defaultPageSize={10}
                                    />

                                } />
                        </Row>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
        </div>
    );
};

export default EditQuiz;