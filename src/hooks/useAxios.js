import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

const useAxios = () => {

    const [response, setResponse] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
    })

    axiosInstance.interceptors.request.use((config) => {
        config.headers['Accept'] = 'application/json'
        config.headers['Authorization'] = Cookies.get('access_token') && `Bearer ${Cookies.get('access_token')}`
        return config;
    }, (error) => {
        return Promise.reject(error)
    })

    axiosInstance.interceptors.response.use((config) => {
        return config
    }, (error) => {
        return Promise.reject(error)
    })

    let controller = new AbortController()

    useEffect(() => {
        return () => {
            controller?.abort()
        }
    }, [])

    const apiHandler = async ({ url, headers = {}, method, data = {}, params = {} }) => {

        setLoading(true)
        controller.abort()
        controller = new AbortController()

        try {
            const result = await axiosInstance({
                url,
                headers,
                method,
                data,
                params,
                signal: controller.signal
            })
            setResponse(result.data)

        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Request canceled', error.message)
            } else {
                setError(error.response ? error.response.data : error.message)
            }

        } finally {
            setLoading(false)
        }
    }

    return { response, error, loading, apiHandler }
}

export default useAxios