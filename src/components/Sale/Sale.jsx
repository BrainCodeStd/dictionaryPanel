import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Datetime from "react-datetime";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Card from "../Card/Card"
import MiniTableButton from "../MiniTableButton/MiniTableButton"
import { getDailySale } from "../../api/api"

import Items from "../Modals/SearchBarCode";
const Sale = (props) => {

    const [items, setItems] = useState(false)
    const [dataDB, setDataDB] = useState([]);
    const [metaData, setMetaData] = useState({})
    const [itemsData, setItemsData] = useState([])
    const [loading, setLoading] = useState(false)
    const [time, setTime] = useState({ time: new Date().toISOString() });
    const [open, setOpen] = useState(false)

    useEffect(() => {
        get();
    }, []);
    useEffect(() => {
        get();
    }, [time]);
    const get = (state) => {
        setLoading(true)
        let newParams = {
            page: state ? state.page + 1 : 1,
            limit: state ? state.pageSize : 10,           
            name: '',           
        }
        if (state) {
            state.filtered.forEach(element => {
                newParams[element.id] = element.value
            })
        }
        getDailySale(newParams).then(res => {
            if (res.error) { } else {
                setDataDB(res.data.data)
                setMetaData(res.data.metadata[0])
                setLoading(false)
            }
        })
    }

    let data = dataDB.length ?
        dataDB.map((element, index) => {
            return {                
                term: element.term,
                defination: element.defination,
                status: element.grandTotal,               
                view: <MiniTableButton text={"View Items"} handleClick={() => {
                    setItemsData(element.items)
                    setItems(true)
                }} />
            }

        })

        : []
    const columns = [
        {
            Header: "Term",
            accessor: "term",
            sortable: false,
            filterable: true,

        },

        {
            Header: "Defination",
            accessor: "defination",
            sortable: false,
            filterable: false
        },

        {
            Header: "Status",
            accessor: "status",
            sortable: false,
            filterable: false
        },

        {
            Header: "Edit",
            accessor: "view",
            sortable: false,
            filterable: false
        },
    ]
    return (<div>
        <Items data={itemsData} show={items} handleClose={() => setItems(false)} />
        <Row>
            <Card
                content={
                    <ReactTable
                        data={data}
                        columns={columns}
                        manual
                        defaultPageSize={10}
                        onFetchData={get}
                        showPaginationBottom
                        showPaginationTop={false}
                        pages={metaData ? metaData.pages : 1}
                        loading={loading}
                        sortable={false}
                        className="-striped -highlight"
                    />


                } />
        </Row>
    </div>)
}
export default Sale