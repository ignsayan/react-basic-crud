import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import { toast } from 'react-toastify';
import Loader from "react-js-loader";

export const VerifyEmail = () => {
    const [params, setParams] = useSearchParams()
    const code = params.get('code')
    const { response, error, loading, apiHandler } = useAxios();
    const body = {}
    useEffect(() => {
        apiHandler({
            url: `/api/verification/email?code=${code}`,
            method: 'GET',
            data: body,
        });
    },[code])
    useEffect(() => {
        if (response) {
            toast.success(response.msg);
        } else {
            toast.error(error?.msg);
        }
    }, [response, error])
  return (
    <div>
    {
        loading
            ? <Loader type="hourglass" bgColor="#212529" size={100} />
            : <div>{response?<div><h1>{response.msg}</h1></div>:<div><h1>{error?.msg}</h1></div>}</div>
    }
    </div>
  )
}
