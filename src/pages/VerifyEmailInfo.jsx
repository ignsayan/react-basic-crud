import React from 'react'

export const VerifyEmailInfo = () => {
    const user = localStorage.getItem('user');
    const email = JSON.parse(user).email;

  return (
    <div className="text-center">
        <h1>We've sent an email to `{email}` to verify your email, please check your email and click on the link</h1>
    </div>
  )
}
