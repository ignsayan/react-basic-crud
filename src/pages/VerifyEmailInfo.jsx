import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useParams, useSearchParams } from 'react-router-dom'
import useAxios from '../hooks/useAxios';
import { ToastContainer, toast } from 'react-toastify';
import Loader from "react-js-loader";

export const VerifyEmailInfo = () => {
  const { email, code } = useParams();
  const [timer, setTimer] = useState(30);
  const [isDisabled, setIsDisabled] = useState(true);
  setTimeout(() => {
    if (timer > 0) {
      setTimer(timer - 1);
    }
    if (timer === 1) {
      setIsDisabled(false);

    }
  }, 1000)
  const { response, error, loading, apiHandler } = useAxios();
  const handleResendMail = () => {
    setTimer(10);
    setIsDisabled(true);
    apiHandler({
      url: `/api/verification/resend?code=${code}`,
      method: 'GET',
      data: {},
    });
  }
  useEffect(() => {
    if (response) {
      toast.success(response.msg);
    } else {
      toast.error(error?.msg);
    }
  }, [response, error])
  return (

    <div>
      <ToastContainer />

      {loading
        ? <Loader type="hourglass" bgColor="#212529" size={100} /> :
        <div className="text-center">
          <h1>We've sent an email to `{email}` to verify your email, please check your email and click on the link</h1>
          <br />
          <h1>Didn't get the email? <Button disabled={isDisabled} onClick={() => handleResendMail()}>{timer != 0 ? `Resend in ${timer}` : 'Resend'}</Button></h1>
        </div>
      }
    </div>
  )
}
