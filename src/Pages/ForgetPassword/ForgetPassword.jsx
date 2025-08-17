import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const ForgetPassword = () => {

    const { resetPassword } = useAuth()
    const location = useLocation();
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (location.state?.email) {
            setEmail(location.state.email);
        }
    }, [location.state]);

    const handleForgetPassword = () => {
        resetPassword(email)
            .then(() => {
                //alert('A password reset email is sent. Please check your email.')
                Swal.fire({
                    position: "center",
                    icon: "info",
                    title: "A password reset email is sent. Please check your email.'",
                    showConfirmButton: false,
                    timer: 1500
                });
                setTimeout(() => {
                    window.location.href = 'https://mail.google.com';
                }, 2000);
            })
            .catch((error) => {
                //alert(error.message);
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Failed to send email !",
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    };

    return (
        <div>
            <div className='flex flex-col justify-center items-center py-5  h-screen'>
                <div className='my-5'>
                    <h1 className='font-bold text-4xl'>Reset Password</h1>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">

                    <div className="card-body">
                        <fieldset className="fieldset">
                            <form>

                                <label className="label mb-2 mt-2">Email</label>
                                <input
                                    type="email"
                                    className="input w-full"
                                    placeholder="Email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />


                                <button onClick={(e) => {
                                    e.preventDefault();
                                    handleForgetPassword();
                                }} className="btn bg-blue-500 text-white rounded-full mt-4 w-full " type='submit'>Reset Password</button>
                            </form>
                            <NavLink to='/login' className='btn rounded-full w-full'>Cancel</NavLink>
                        </fieldset>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ForgetPassword;