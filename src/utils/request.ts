import axios from 'axios'

export const request = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 5000
})
