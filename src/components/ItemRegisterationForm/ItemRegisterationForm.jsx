import React, { useState, useEffect } from 'react';
import {
    FormGroup, ControlLabel,Col
} from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import { useForm } from 'react-hook-form';
import "../../assets/css/light-bootstrap-dashboard-pro-react.css"
import Select from 'react-select';
import { REG_BTN_NAME, REG_SUCCESS } from "../../misc/constants";
import { SuccessfullToast, ErrorToast } from "../../misc/helper"
import { createItem } from "../../api/api"
function SellerRegisteration(props) {
    const [loading, setLoading] = useState(false)
    const [valueComp, setValueComp] = useState('')
    const [valueCateg, setValueCateg] = useState('')
    const [valueSeller, setValueSeller] = useState('')
    const {
        register,
        handleSubmit,
    } = useForm();
    const onSubmitData = (data) => {
        setLoading(true)
        data.salePrice = +data.salePrice;
        data.purchasePrice = +data.purchasePrice;
        data.stockIn = +data.stockIn;
        data.companyId = valueComp
        data.sellerId = valueSeller
        data.categoryId = valueCateg
        createItem(data).then(res => {
            if (res.error) {
                setLoading(false)
                ErrorToast(res.error.response.data);
            } else {
                SuccessfullToast(REG_SUCCESS)
                setLoading(false)
            }
        })

    };
    return (
        <div>
            <Col md={2}></Col>
            <Col md={8}>
                <form onSubmit={handleSubmit(onSubmitData)}>
                    <ControlLabel><b>Term's Registeration</b></ControlLabel>
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

                    <Button type="submit" className="btn-fill"  >
                        {loading ? <div><span>loading...</span><i className="fa fa-spin fa-spinner" /></div> : REG_BTN_NAME}
                    </Button>
                </form>
            </Col>
            <Col md={2}></Col>
        </div>
    );
}

export default SellerRegisteration;
