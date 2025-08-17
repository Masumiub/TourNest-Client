import React from 'react';
import { NavLink } from 'react-router';
import Lottie from "lottie-react";
import ErrorImg from '../assets/loading.json'


const Loading = () => {
    return (
        <div className='mx-auto flex flex-col justify-center text-center my-30'>
            <div className='mx-auto'>
            
            <Lottie className="w-[270px] md:w-[400px] lg:w-[400px] mx-auto" animationData={ErrorImg}  loop={true} ></Lottie>
            </div>

            <div className='mt-10 text-center mx-auto'> 
                <h2 className='text-2xl'>Loading...</h2>
            </div>
        </div>
    );
};

export default Loading;
