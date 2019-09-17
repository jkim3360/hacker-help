import axios from 'axios'
const BASE_URL = `http://172.16.7.82:3000/`
import { getUser } from './Credentials'
const JwtToken = 'token'
// process.env.API_URL ||
// const JWT_TOKEN = localStorage.getItem('token')

export const apiCall = axios.create({
    baseURL: BASE_URL
})

export const loginUser = async (user) => {
	try {
		const resp = await api.post('/auth/login', user)
		const response = {
			status: resp.status,
			token: resp.data.token,
			userId: resp.data.user.id
		}

		return response
	} catch (error) {
		throw error
	}
}

export const getCurrentUser = async () => {
	try {
		const userId = await getUser()
		const resp = await api.get(`/auth/${userId}`)
		return resp.data
	} catch (error) {
		throw error
	}
}

export const signUpUser = async (user) => {
	try {
		const resp = await api.post('/auth/signup', user)
		const data = { status: resp.status, data: resp.data }
		return data
	} catch (error) {
		throw error
	}
}