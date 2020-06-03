//help https://stackoverflow.com/questions/49500379/typical-file-structure-in-reactjs-application-grouping-api-calls-in-api-js
import axios from 'axios';
import resolve from './resolve';
require('dotenv').config()

// let apiBaseUrl = 'http://loca';
// let URL="https://pos-react.herokuapp.com"
let apiBaseUrl = process.env.URL || 'http://localhost:5001';

export const testAuth = async () => {
    return await resolve(axios.get(`${apiBaseUrl}/profile`).then(res => res.data));
}
export const login = async (email, password) => {

    try {

        return await resolve(axios.post(`${apiBaseUrl}/api/auth/login`, {
            user: {
                email,
                password
            }
        }).then(res => res.data))
    }
    catch (err) {
        console.log(err)
    }
}
//////////////////////////////POST//////////////////////////////////////////////
export const addTerm = async (data) => {
    return await resolve(axios.post(`${apiBaseUrl}/api/addTerm`, data)
        .then(res => res.data));
}

//==========================GET========================//
export const getAllWords = async (params) => {
    return await resolve(axios.get(`${apiBaseUrl}/api/getTerm?term=${params.term}&page=${params.page}&limit=${params.limit}&allwords=${params.allwords}`)
        .then(res => res.data));
}
//--------------------------------PUT--------------------------//
export const updateTerm = async (id, data) => {
    return await resolve(axios.put(`${apiBaseUrl}/api/updateTerm/${id}`, data)
        .then(res => res.data));
}
