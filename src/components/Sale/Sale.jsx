import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import ReactTable from "react-table";
import "react-table/react-table.css";
import Card from "../Card/Card"
import Button from "../CustomButton/CustomButton"
import { getAllWords, updateTerm } from "../../api/api"
import Switch from "react-switch"
import { REG_BTN_NAME, REG_SUCCESS } from "../../misc/constants";
import { SuccessfullToast, ErrorToast } from "../../misc/helper"
import EditTerm from "../Modals/EditQuiz";
const Sale = (props) => {

    const [items, setItems] = useState(false)
    const [dataDB, setDataDB] = useState([]);
    const [metaData, setMetaData] = useState({})
    const [itemsData, setItemsData] = useState([])
    const [loading, setLoading] = useState(false)
    const [uploading, setUpLoading] = useState(false)
    const [selectedId, setSelectedId] = useState(null)


    const update = (id, data) => {
        setUpLoading(true);
        updateTerm(id, data).then(res => {
            if (res.error) { } else {
                SuccessfullToast(res.data.message)
                get()
            }
        })
    }
    const get = (state) => {
        setLoading(true)
        let newParams = {
            page: state ? state.page + 1 : 1,
            limit: state ? state.pageSize : 10,
            term: '',
            allwords: true
        }
        if (state) {
            state.filtered.forEach(element => {
                newParams[element.id] = element.value
            })
        }
        getAllWords(newParams).then(res => {
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
                status: <Switch
                    onChange={() => {
                        update(element._id, { active: !element.active })
                    }}
                    checked={element.active}
                    className="react-switch"
                />,
                view: <Button fill onClick={() => {
                    setItems(true)
                    setItemsData(element)
                }}><i class="fa fa-edit"></i></Button>
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
            Header: () => <div style={{ textAlign: "left" }}>Edit</div>,
            accessor: "view",
            sortable: false,
            filterable: false
        },
    ]
    return (<div>
        <EditTerm data={itemsData} update={update} uploading={uploading} show={items} handleClose={() => setItems(false)} />
        <Row>
            <Card
                content={
                    <ReactTable
                        data={data ? data : data}
                        columns={columns}
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