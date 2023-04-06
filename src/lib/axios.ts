import delay from '@/utility/delay'
import Axios, { AxiosError, AxiosResponse } from 'axios'

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
})

axios.interceptors.response.use(
    res => {
        if (process.env.NODE_ENV === 'development') {
            // await delay(1000)
        }
        return res
    },
    // error => {
    // const { data, status, config } = error.response!
    // switch (status) {
    //     case 400:
    //         console.error(data)
    //         break
    //     case 401:
    //         console.error('unauthorised')
    //         break
    //     case 404:
    //         console.error('/not-found')
    //         break
    //     case 500:
    //         console.error('/server-error')
    //         break
    // }
    // return Promise.reject(error)
    // return error
    // },
)

export default axios
