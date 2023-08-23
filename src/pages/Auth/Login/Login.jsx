import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';
import { Form } from '../../Auth/index'
import axios from 'axios'
import { useForm } from "react-hook-form";
import { ToastContainer, Zoom, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useStateContext } from '../../../context/userContext';

export const Login = () => {

    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const navigate = useNavigate();
    const handleError = (errors) => {};
    const psw = watch('password')
    const [_, setCookies] = useCookies(["access_token"]);
    const { putUsername } = useStateContext()

    const handleRegistration = async (data) => { 
        const { username, password } = data
        try {
            const { data } = await axios.post("http://localhost:5000/auth/login", { username, password });
            if(data.token) {
                setCookies('access_token', data.token);
                window.localStorage.setItem("userID", data.userID);
                putUsername(data.name)
                navigate("/");
            } else {
                notify(data.error)
            }
        } catch (err) {
            toast.error(err, { 
                position: toast.POSITION.TOP_CENTER, 
                className: 'font-semibold text-lg',
                transition: Zoom,
                autoClose: 2000
            })
        }
    };

    const notify = (error) => {
        toast.error(error, {
            position: toast.POSITION.TOP_CENTER,
            className: 'foo-bar text-lg text-red-500 font-medium font-bahnschrift',
            transition: Zoom,
            autoClose: 2000,
            theme: "colored",
        })
    }
    

    return (
        <div className='flex w-full justify-center items-center mx-auto mt-10 h-auto overflow-y-auto'>
            <ToastContainer /> 
            
            <Form 
                register={register}
                watch={watch}
                label="Login"
                psw={psw}
                errors={errors}
                onSubmit={ handleSubmit(handleRegistration, handleError) }
            />
        </div>
        
    )
}