import React, { useEffect, useState } from 'react';
import {
    Col,
    Row,
} from "react-bootstrap";
import Card from "../../components/Card/Card"
import Category from '../../components/CategoryRegisteration/CategoryRegisteration'
import Company from '../../components/CompanyRegisteration/CompanyReg'
import Seller from '../../components/SellerRegisteration/SellerRegisteration'
import Item from '../../components/ItemRegisterationForm/ItemRegisterationForm'
import _ from 'lodash'
import { getAllCategories, getAllCompanies, getAllSellers } from "../../api/api"

function Registeration(props) {
    const [comp, setComp] = useState([]);
    const [seller, setSeller] = useState([]);
    const [categ, setCateg] = useState([]);
    const getCategory = () => {
        getAllCategories().then(res => {
            if (res.error) { } else {
                setCateg(_.chain(res.data).map(({ name, _id }) => name = { value: _id, label: name }).value())
            }
        })
    }
    const getCompany = () => {
        getAllCompanies().then(res => {
            if (res.error) { } else {
                setComp(_.chain(res.data).map(({ name, _id }) => name = { value: _id, label: name }).value())
            }
        })
    }
    const getSeller = () => {
        getAllSellers().then(res => {
            if (res.error) { } else {
                setSeller(_.chain(res.data).map(({ name, _id }) => name = { value: _id, label: name }).value())
            }
        })
    }
    // seller=React.useMemo(()=>getSeller(),[seller])
    useEffect(() => {
        getCategory();
        getCompany();
        getSeller();
    }, [])
    useEffect(() => { }, [seller, categ, comp])

    return (
        <div>
            <Row>
                <Col md={6}>
                    <Card
                        content={
                            <Item seller={seller ? seller : []} category={categ ? categ : []} company={comp ? comp : []} />
                        }
                    />

                </Col>
                <Col md={6}>
                    <Row>
                        <Col md={1}></Col>
                        <Col md={10}> <Card
                            content={
                                <Category data={categ} get={getCategory} />
                            }
                        /></Col>
                        <Col md={1}></Col>
                    </Row>
                    <Row>
                        <Col md={1}></Col>
                        <Col md={10}> <Card
                            content={
                                <Company data={comp} get={getCompany} />
                            }
                        /></Col>
                        <Col md={1}></Col>
                    </Row>
                    <Row>
                        <Col md={1}></Col>
                        <Col md={10}> <Card
                            content={
                                <Seller data={seller} get={getSeller} />
                            }
                        /></Col>
                        <Col md={1}></Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default Registeration;
