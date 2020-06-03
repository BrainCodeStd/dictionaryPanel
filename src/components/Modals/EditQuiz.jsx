import React, { useState } from 'react';
import { Col, Row, Button, Modal, FormGroup, ControlLabel } from "react-bootstrap";
import _ from 'lodash'
import { useForm } from 'react-hook-form';
const EditQuiz = (prop) => {
    const [term, setTerm] = useState(prop.data.term);
    const [defination, setDefination] = useState(prop.data.defination);

    const {
        register,
        handleSubmit
    } = useForm({
        defaultValues: {
            'term': term,
            'defination': defination,
        }
    });
    const onSubmit = (data) => {
        prop.update(prop.data._id, data)
        prop.handleClose()
    };

    return (
        <Modal show={prop.show} onHide={prop.handleClose} bsSize="lg">
            <Modal.Header className="mdhead" closeButton >
                <Modal.Title>Edit Question</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ControlLabel><b>Term's Updation</b></ControlLabel>
                    <FormGroup>
                        <input
                            type="text"
                            name={`term`}
                            ref={register({ required: true, validate: value => value !== "" })}
                            className={"form-control"}
                            placeholder="Enter Term"
                        />
                    </FormGroup>
                    <FormGroup>
                        <textarea
                            type="text"
                            name={`defination`}
                            ref={register({ required: true, validate: value => value !== "" })}
                            className={"form-control"}
                            placeholder="Enter Defination"
                        />
                    </FormGroup>
                    <Button type="submit" disabled={prop.uploading ? true : false}>
                        {" "}
                        {prop.uploading ? <div><span>loading...</span><i className="fa fa-spin fa-spinner" /></div> : "Edit"}
                    </Button>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default EditQuiz;