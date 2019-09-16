import axios from 'axios'
const BASE_URL = `http://192.168.1.253:3000/`
// process.env.API_URL ||
// const JWT_TOKEN = localStorage.getItem('token')

export const apiCall = axios.create({
    baseURL: BASE_URL
})
