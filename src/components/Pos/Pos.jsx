import React from 'react';
import {
    FormGroup, Row, Col, ControlLabel
} from 'react-bootstrap';
import ReactTable from "react-table";
import "react-table/react-table.css";
import Card from "../Card/Card"
import Button from "../CustomButton/CustomButton.jsx";
import { CHECKOUT_BTN_NAME } from "../../misc/constants"
import SearchBarCode from "../Modals/SearchBarCode"
import QuantityUpdate from "../Modals/QuantityUpdate";
import { getSale, getOrderNo, createSale, updateStockDel } from "../../api/api"
import { ErrorToast } from "../../misc/helper"
import { debounce } from 'lodash'
// const Pos = (props) => {
const del = (obj) => {
    updateStockDel(obj).then(res => {
        return res;
    })
}

class Pos extends React.Component {
    state = {
        open: false,
        barcode: '',
        data: [],
        discount: 0,
        subtotal: 0,
        grandTotal: 0,
        amountPaid: 0,
        amountReturned: 0,
        orderNo: 1

    }
    componentDidMount() {
        this.fetchO_No()
    }
    fetchO_No = () => {
        getOrderNo().then(res => {
            if (res.error) {
                ErrorToast(res.error.response.data);
            } else {
                let returnData = res.data;
                this.setState({ orderNo: returnData })
            }
        })
    }
    submitSale = () => {

        const { orderNo, data, subtotal, grandTotal, discount, amountPaid, amountReturned } = this.state;
        if (amountPaid === 0) return alert('Cannot Submit without amount Recieved')

        let Obj = {
            orderNo: orderNo,
            items: data,
            subTotal: subtotal,
            Discount: discount,
            grandTotal: grandTotal,
            amountPayed: amountPaid,
            amountReturned: amountReturned
        }

        createSale(Obj).then(res => {
            if (res.error) {
                ErrorToast(res.error.response.data);
            } else {

                this.setState({
                    barcode: '',
                    data: [],
                    discount: 0,
                    subtotal: 0,
                    grandTotal: 0,
                    amountPaid: 0,
                    amountReturned: 0,
                }, () => this.fetchO_No())
            }

        })

    }
    debounceEvent(...args) {
        this.debounceEvent = debounce(...args);
        return e => {
            e.persist();
            return this.debounceEvent(e)
        }
    }

    api = debounce(() => {
        getSale(this.state.barcode).then(res => {
            if (res.error) {
                ErrorToast(res.error.response.data);
            } else {
                let returnData = res.data;
                if (!returnData) return false;
                let obj = {
                    barcode: returnData.barcode,
                    name: returnData.name,
                    quantity: 1,
                    salePrice: +returnData.salePrice,
                    amount: (1 * +returnData.salePrice),
                    purchasePrice: returnData.purchasePrice,
                    companyId: returnData.companyId,
                    sellerId: returnData.sellerId,
                    categoryId: returnData.categoryId
                }
                if (this.state.data.length === 0) {
                    let state = this.state.data;
                    state.push(obj);
                    this.setState({ data: state, barcode: '' }, () => this.calculator());
                } else {
                    this.find(obj)
                }
            }
        })
    }, 500)
    abc = (e) => {
        this.setState({ barcode: e.target.value })
        this.api()
    }
    deleteRecord = (element) => {
        let { data } = this.state;
        let array = data;
        for (let i = 0; i < array.length; i++) {
            if (Object.values(array[i]).indexOf(element.barcode) > -1) {
                let deleted = array.splice(i, 1);
                // let deducted=       
                deleted = deleted[0].amount;
                this.setState({ data: array, subtotal: this.state.subtotal - deleted, grandTotal: this.state.subtotal - deleted })
                // subtotal
                break
            }
        }
        let obj = {
            barcode: element.barcode,
            stockIn: element.quantity
        }
        const res = del(obj)
        if (res) {
            ErrorToast(res.error.response.data);
        } else {

        }


    }

    calculator = () => {
        let array = this.state.data; let subtotal = 0;
        array.forEach((element) => {
            subtotal += element.amount;
        })
        this.setState({ subtotal: subtotal, grandTotal: subtotal - this.state.discount })
    }





    find = (obj) => {
        let found = false;

        for (let i = 0; i < this.state.data.length; i++) {
            if (Object.values(this.state.data[i]).indexOf(obj.barcode) > -1) {
                let array = this.state.data;
                let obj = array[i];
                let inc = +obj.quantity + 1
                obj.quantity = inc;
                obj.amount = inc * +obj.salePrice;
                array.splice(i, 1, obj);
                this.setState({ data: array, barcode: '' }, () => this.calculator())
                found = true;
                break
            }
        }

        if (!found) {
            this.setState({ data: [...this.state.data, obj], barcode: '' }, () => this.calculator())

        }

    }



    render() {


        let record = this.state.data.length ?
            this.state.data.map((returnData) => {
                return {
                    barcode: returnData.barcode,
                    name: returnData.name,
                    quantity: returnData.quantity,
                    salePrice: returnData.salePrice,
                    amount: returnData.amount,
                    purchasePrice: returnData.purchasePrice,
                    companyId: returnData.companyId,
                    sellerId: returnData.sellerId,
                    categoryId: returnData.categoryId,
                    remove: <Button className="btn-fill" onClick={() => this.deleteRecord(returnData)}><i style={{ color: 'white' }} className="fa fa-trash-o"></i></Button>
                }
                // salePrice
                // amount


            })

            : []
        const columns = [
            {
                Header: "Barcode",
                accessor: "barcode",
                id: "barcode",
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
            },
            {
                Header: "Amount",
                accessor: "amount",
                sortable: false
            },
            {
                Header: "Remove",
                accessor: "remove",
                sortable: false
            }
        ]


        return (
            <div>
                <SearchBarCode show={this.state.open} handleClose={() => this.setState({ open: false })} />
                <Row>
                    <Col md={1}></Col>
                    <Col md={10}>
                        <Row>
                            <Card
                                content={
                                    <Row>
                                        <Col md={6}>
                                            <ControlLabel>Enter BarCode Press Enter</ControlLabel>
                                            <FormGroup>
                                                <input
                                                    type="text"
                                                    autoFocus

                                                    className={"form-control"}
                                                    placeholder="Barcode"
                                                    value={this.state.barcode}
                                                    onChange={this.abc}

                                                />
                                            </FormGroup>

                                        </Col>
                                        <Col md={6}>

                                            <ControlLabel>Order Number</ControlLabel>
                                            <FormGroup>
                                                <input
                                                    disabled
                                                    type="text"
                                                    value={this.state.orderNo}
                                                    className={"form-control"}
                                                    placeholder="OrderNo"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                }
                            />
                        </Row>
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
                                        style={{
                                            height: "400px" // This will force the table body to overflow and scroll, since there is not enough room
                                        }}

                                    />

                                } />
                        </Row>
                        <Row>
                            <Card
                                content={
                                    <>
                                        <Row>
                                            <Col md={6}>
                                                <ControlLabel>Sub Total</ControlLabel>
                                                <FormGroup>
                                                    <input
                                                        disabled
                                                        type="text"
                                                        value={this.state.subtotal}
                                                        className={"form-control"}
                                                        placeholder="Sub Total"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <ControlLabel>Discount</ControlLabel>

                                                <FormGroup>
                                                    <input
                                                        type="text"
                                                        onChange={(e) => this.setState({ discount: e.target.value })}
                                                        onKeyPress={(event) => {
                                                            if (event.keyCode === 13 || event.which === 13) {
                                                                this.setState({ grandTotal: this.state.subtotal - this.state.discount })
                                                            }
                                                        }}
                                                        value={this.state.discount}
                                                        className={"form-control"}
                                                        placeholder="Discount"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <ControlLabel>Grand Total</ControlLabel>

                                                <FormGroup>
                                                    <input
                                                        disabled
                                                        type="text"
                                                        value={this.state.grandTotal}
                                                        className={"form-control"}
                                                        placeholder="Grand Total"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <ControlLabel>Amount Paid</ControlLabel>

                                                <FormGroup>
                                                    <input
                                                        type="text"
                                                        onChange={(e) => this.setState({ amountPaid: e.target.value, amountReturned: e.target.value - this.state.grandTotal })}
                                                        onKeyPress={(event) => {
                                                            if (event.keyCode === 13 || event.which === 13) {
                                                                this.setState({ amountReturned: this.state.amountPaid - this.state.grandTotal })
                                                            }
                                                        }}
                                                        value={this.state.amountPaid}
                                                        className={"form-control"}
                                                        placeholder="Amount Paid"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <ControlLabel>Amount Returned</ControlLabel>

                                                <FormGroup>
                                                    <input
                                                        type="text"
                                                        disabled
                                                        value={this.state.amountReturned}
                                                        className={"form-control"}
                                                        placeholder="Amount Returned"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <Button style={{ width: "324px", marginTop: '24px' }} type="button" onClick={() => {
                                                    this.submitSale()
                                                    // let { data, amountReturned, amountPaid, discount, subtotal, grandTotal } = this.state;

                                                }} className="btn-fill"  >
                                                    {CHECKOUT_BTN_NAME}
                                                </Button>
                                            </Col>

                                        </Row>
                                    </>
                                } />
                        </Row>

                    </Col>
                    <Col md={1}></Col>
                </Row>
            </div>
        );
    }
};

export default Pos;