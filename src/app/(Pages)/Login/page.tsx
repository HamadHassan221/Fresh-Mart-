import React from 'react'
import { LoginForm } from "./_Components-LoginForm/LoginForm";
export default function Login() {
  return (
    <>
        <div className='min-h-[60vh] flex flex-col justify-center items-center gap-8'>
            <h1 className='font-bold text-4xl'>
                Welcome Back!
            </h1>
            <LoginForm/>
        </div>
    </>
  )
}
