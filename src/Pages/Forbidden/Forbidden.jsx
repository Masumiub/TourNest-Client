import React from 'react';
import { NavLink } from 'react-router';
import Lottie from "lottie-react";
import ErrorImg from '../../assets/forbidden403.json'


const Forbidden = () => {
    return (
        <div className='mx-auto flex flex-col justify-center text-center my-30'>
            <div className='mx-auto'>
            
            <Lottie className="w-[270px] md:w-[500px] lg:w-[800px] mx-auto" animationData={ErrorImg}  loop={true} ></Lottie>
            </div>

            <div className='mt-10 text-center mx-auto'> 
                <h2 className='text-2xl md:text-5xl lg:text-7xl'>Forbidden access!</h2>
                <NavLink to='/' className="btn btn-neutral mt-8">Go Back to Home</NavLink>
            </div>
        </div>
    );
};

export default Forbidden;