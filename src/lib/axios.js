import delay from '@/utility/delay'
import Axios from 'axios'

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
})

axios.interceptors.response.use(async res => {
    if (process.env.NODE_ENV === 'development') {
        // await delay(1000)
    }
    return res
})

export default axios
