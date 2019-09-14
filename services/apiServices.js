import axios from 'axios'

const BASE_URL = 
// process.env.API_URL ||
 `http://localhost:3000/`
// const JWT_TOKEN = localStorage.getItem('token')

export const apiCall = axios.create({
    baseURL: BASE_URL
    
})

