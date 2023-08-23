import { useState } from 'react'
import { Form } from '../../Auth/index'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useForm } from "react-hook-form";

export 
const Register = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const navigate = useNavigate();
    const handleError = (errors) => {};
    const psw = watch('password')
    
    const handleRegistration = async (data) => { 
        const { username, password } = data 
        console.log(username)
        console.log(password)
        try {
            await axios.post("http://localhost:5000/auth/register", { username, password });
            alert("Registration complete, now login")
        } catch ( err ) {
            console.error(err);
        }
        navigate('/login')
    };

    return (
        <div className='flex w-full justify-center items-center mx-auto mt-10 h-auto overflow-y-auto'>
            <Form 
                register={register}
                watch={watch}
                label="Register"
                psw={psw}
                errors={errors}
                onSubmit={ handleSubmit(handleRegistration, handleError) }
            />
        </div>
        
    )
}