import { keyAuthorization } from '../constants/localStorage'
import axios from 'axios'


export const setKeyAuth = (value) => {
    Authorization = value
}
const BACKEND_URL = 'http://localhost:8000/api'
let Authorization = ''
const request = async ({
    url = '',
    method = 'GET',
    data = {},
    params = {},
    headers = {},
    auth = true,
}) => {
    try {
        if (!Authorization && auth) {
            const token = localStorage.getItem(keyAuthorization)
            if (token) Authorization = token
        }

        const requestOptions = {
            url: BACKEND_URL + url,
            method,
            data,
            params,
            headers: {
                ...headers,
                Authorization: auth ? Authorization || '' : undefined,
            },
        }

        const response = await axios(requestOptions)

        const dataResponse = response?.data

        return Promise.resolve(dataResponse)
    } catch (error) {
        return Promise.reject(error)
    }
}

export default request
