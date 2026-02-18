import React from 'react'
import { RegisterForm } from './RegisterForm/RegisterForm'

export default function Register() {
  return (
    <>
        <div className='min-h-[60vh] flex flex-col justify-center items-center gap-8'>
            <h1 className='font-bold text-4xl'>
                Welcome!
            </h1>
            <RegisterForm/>
        </div>
    </>
  )
}
