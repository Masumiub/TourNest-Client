import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from 'react-router';
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useForm } from 'react-hook-form'
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import Lottie from 'lottie-react';
import Animation from '../../assets/Man Planning A Sightseeing Route.json';


//admin@gmail.com
//admin1234


const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');

    const { signInWithGoogle, signinUser } = useAuth()
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/';

    const { register,
        formState: { errors },
        handleSubmit } = useForm();

    const onSubmit = data => {
        //console.log(data);
        signinUser(data.email, data.password)
            .then(result => {
                //console.log(result.user)
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Hello! Welcome to TourNest.",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from)
            })
            .catch(error => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: `Failed to Login!${error} `,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            )
    }

    const handleSignInWithGoogle = () => {
        signInWithGoogle()
            .then(result => {
                //console.log(result.user)
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Hello! Welcome to TourNest.",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from)
            })
            .catch(error => {
                {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: `Failed to Login!${error} `,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    return (
        <div className='mb-20'>
            <div className='mt-35 text-center'>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-5 bg-base-200 rounded-2xl bg-gradient-to-l from-sky-500 to-blue-700 mb-5">

                <div className='w-full md:w-1/2 pb-20'>
                    <div className='text-center text-white mt-20 mb-10'>
                        <h2 className='text-5xl font-bold'>Login to tourNest!</h2>
                        <p className='mt-3'>Dive into the rich history, vibrant traditions, and breathtaking nature.</p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
                        <div className="card-body">
                            <fieldset className="fieldset">

                                <form onSubmit={handleSubmit(onSubmit)}>

                                    <label className="label mt-2 mb-2">Email</label>
                                    <input
                                        type="email"
                                        className="input w-full"
                                        placeholder="Email"
                                        name="email" {...register('email')}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />

                                    <label className="label mt-2 mb-2">Password</label>

                                    <div className='relative'>

                                        <input type={showPassword ? 'text' : 'password'}
                                            className="input w-full " placeholder="Password" name='password' {...register('password', { required: true, minLength: 6 })} />

                                        <button onClick={() => { setShowPassword(!showPassword) }}
                                            className='btn btn-xs absolute top-2 right-2 border-0' type="button"> {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />} </button>
                                    </div>

                                    {
                                        errors.password?.type === 'required' && <p className='text-red-500 mt-2'>Password is required!</p>
                                    }
                                    {
                                        errors.password?.type === 'minLength' && <p className='text-red-500 mt-2'>Password must be 6 characters long!</p>
                                    }


                                    <div className='mt-2'><Link to='/forgetPassword' state={{ email }} className="link link-hover">Forgot password?</Link></div>


                                    <button className="btn mt-4 w-full rounded-full bg-blue-500 border-0 text-white" type='submit'>Login</button>
                                    <div className="divider">OR</div>
                                    <button onClick={handleSignInWithGoogle} className="btn  w-full rounded-full" type='submit'> <FcGoogle /> Login with Google</button>
                                </form>

                            </fieldset>

                            <div className='text-center'>
                                <p>Don't have an account? <Link to='/register' className='text-blue-500'>Register</Link> </p>
                            </div>

                        </div>
                    </div>
                </div>

                <div className='w-full md:w-1/2 flex justify-center'>
                    <Lottie animationData={Animation} loop={true} className="w-[300px] md:w-[400px] lg:w-[800px] mx-auto" />
                </div>
            </div>


        </div>
    );
};

export default Login;