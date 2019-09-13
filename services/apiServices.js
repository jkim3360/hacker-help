import axios from 'axios'
const BASE_URL = 'https://hacker-news.firebaseio.com/v0/item/9127232.json?print=pretty'
import { getUser } from './Credentials'
const JwtToken = 'token'



const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		Authorization: `Bearer ${JwtToken}`,
		'Access-Control-Allow-Origin': '*'
	}
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
