import React from 'react'
import { RegisterLogin } from '../components/RegisterLogin';

export function Register() {
    return (
        <div className='dark:bg-gray-800 flex justify-center items-center flex-col h-screen w-screen gap-5'>
            <RegisterLogin />
        </div>
    )
}

