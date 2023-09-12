import logo from '../../../assets/tiramisu.png'
import { Link } from 'react-router-dom'
import { route } from '../../../models/route.model'

const registerOptions = {
    username: { required: "Username is required" },
    email: { required: "Email is required" },
    password: {
        required: "Password is required",
        minLength: {
            value: 8,
            message: "Password must have at least 8 characters"
        }
    },
    confirmPassword: {
        required: "Confirm Password is required",
        minLength: {
            value: 8,
            message: "Password must have at least 8 characters"
        }
    }
};

export const Form = ({ register, errors, watch, psw, label, onSubmit }) => {
    return (
        <div className='flex flex-col sm:flex-row w-5/6 xl:w-7/12 justify-center shadow-lg bg-gray-100 rounded-[20px] mb-5 xl:mb-0'>
            <div className='h-full'>
                <img src='https://www.lecremedelacrumb.com/wp-content/uploads/2018/03/baked-teriyaki-chicken-102.jpg' className="sm:rounded-tl-[20px] sm:rounded-bl-[20px] h-[450px] w-full md:h-[550px] md:w-[600px]" height={800} width={650} alt="" />
            </div>
            <div className='items-center flex flex-col justify-center w-full max-w-[1280px] h-auto px-5 sm:p-5'>
                <div className="flex flex-col items-center mb-6">
                    <img src={logo} alt="" width={60} className="mt-7 sm:mt-0" />
                    <span className="mt-3 text-2xl font-medium">{label} to Umai</span>
                </div>
                <form onSubmit={onSubmit} className='w-5/6'>
                    <div className='flex flex-col'>
                        <input type="text" id="username" name="username" placeholder="Username" className='border h-[45px] p-1 rounded-md ps-5' {...register('username', registerOptions.username)} />
                    </div>
                    <small className="text-red-600 text-sm font-medium ml-1 mt-2">
                        {errors?.username && errors.username.message}
                    </small>
                    <div className='flex flex-col mt-2'>
                        <input type="password" id="password" name="password" placeholder="Password" className='border h-[45px] p-1 rounded-md ps-5' {...register('password', registerOptions.password)} />
                    </div>
                    <small className="text-red-600 text-sm font-medium ml-1 mt-2">
                        {errors?.password && errors.password.message}
                    </small>
                    {
                        label === 'Register'
                            ? <div>
                                <div className='flex flex-col mt-2'>
                                    <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Repeat password" className='border h-[45px] p-1 rounded-md ps-5'
                                        {...register('confirmPassword', {
                                            validate: value =>
                                                value === psw || "The passwords do not match"
                                        })}
                                    />
                                 </div>
                                <small className="text-red-600 text-sm font-medium ml-1 mt-2">
                                    {errors?.confirmPassword && errors.confirmPassword.message}
                                </small>
                              </div>
                            : null
                    }
                    
                    <button type='submit' className='bg-amber-400 hover:bg-amber-300 w-full px-6 py-2 mt-5 rounded-md text-white font-medium'>{label}</button>   
                    
                    {
                        label === 'Login'
                            ? <div className='flex flex-row justify-center mb-7 sm:mb-0 mt-10'>
                                <span className="font-medium text-md text-gray-600">Do you not have an account? </span>
                                <Link className='ml-2 font-medium text-orange-400' to={route.register.path} >Register</Link>
                            </div>
                            : <div className='flex flex-row justify-center mb-7 sm:mb-0 mt-10'>
                                <span className=" font-medium text-md text-gray-600">Do you have an account! </span>
                                <Link className='ml-2 font-medium text-orange-400' to={route.login.path} >Login</Link>
                            </div>
                    }
                </form>
            </div>
        </div>
    )
}