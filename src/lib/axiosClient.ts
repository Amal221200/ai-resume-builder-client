"use server"
import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${process.env.API_DOMAIN}/api/`,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.API_KEY}`
    }
})

export default axiosClient