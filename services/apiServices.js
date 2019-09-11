import axios from 'axios'
const BASE_URL = 'https://hacker-news.firebaseio.com/v0/item/9127232.json?print=pretty'


const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		Authorization: `Bearer ${JwtToken}`,
		'Access-Control-Allow-Origin': '*'
	}
})

export const getStories = async () => {
	try {
		const resp = await axios.get(
            `https://hacker-news.firebaseio.com/v0/item/9127232.json?print=pretty`
          )
		return resp.data
	} catch (error) {
		throw error
	} 
}