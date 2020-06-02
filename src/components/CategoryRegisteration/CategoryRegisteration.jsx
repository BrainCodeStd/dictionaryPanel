import React, { useState } from 'react';
import {
    FormGroup,
    ControlLabel
} from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import { useForm } from 'react-hook-form';
import "../../assets/css/light-bootstrap-dashboard-pro-react.css"
import { REG_BTN_NAME ,REG_SUCCESS} from "../../misc/constants";
import { createCategory } from "../../api/api"
import { SuccessfullToast, ErrorToast } from "../../misc/helper"
function CategoryRegisteration(props) {
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
    } = useForm();
    const onSubmit = (data) => {
        createCategory(data).then(res => {
            if (res.error) {
                setLoading(false)
                ErrorToast(res.error.response.data);
            } else {
                SuccessfullToast(REG_SUCCESS)
                setLoading(false)
                props.get();
            }
        })
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ControlLabel><b>Item's Category</b></ControlLabel>
                <FormGroup>
                    <input
                        type="text"
                        name={`name`}
                        ref={register({ required: true, validate: value => value !== "" })}
                        className={"form-control"}
                        placeholder="Enter Name"
                    />
                </FormGroup>
                <Button type="submit" className="btn-fill" onClick={() => setLoading(true)} >
                    {loading ? <div><span>loading...</span><i className="fa fa-spin fa-spinner" /></div> : REG_BTN_NAME}
                </Button>
            </form>

        </div>
    );
}

export default CategoryRegisteration;
