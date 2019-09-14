import axios from 'axios'
const BASE_URL = `http://172.16.7.82:3000/`
// process.env.API_URL ||
// const JWT_TOKEN = localStorage.getItem('token')

export const apiCall = axios.create({
    baseURL: BASE_URL
})
