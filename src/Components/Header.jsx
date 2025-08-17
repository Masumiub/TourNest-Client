import React from 'react';
import { Link } from 'react-router';
import Slider from "react-slick";
import headerBanner1 from '../assets/headerBanner1.png'
import headerBanner2 from '../assets/headerBanner2.png'
import headerBanner3 from '../assets/headerBanner3.png'
 
const Header = () => {

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true
    };


    return (

        <div className="">
            <Slider {...settings}>
                <div>
                    <div className='flex flex-col md:flex-row gap-10 mt-25 mb-25 py-10 px-2 items-center'>
                        <div className='w-full md:w-1/2'>
                            <h1 className='text-4xl lg:text-6xl'>Discover Bangladesh’s <span className='text-blue-500 font-bold'>Hidden Gems</span></h1>

                            <p className='mt-5'>From serene hill tracts to untouched beaches, TourNest guides you to the lesser-known wonders of Bangladesh. Explore off-the-beaten-path locations with confidence.</p>

                            <Link className='btn btn-lg mt-8 bg-blue-500 text-white rounded-full hover:text-blue-500 hover:bg-white' to='/allTrips'>Explore Now</Link>
                        </div>
                        <div className='w-full md:w-1/2'>
                            <img src={headerBanner1} alt="headerBanner1" className='w-full'/>
                        </div>
                    </div>
                </div>

                <div>
                    <div className='flex flex-col md:flex-row gap-10 mt-25 mb-25 py-10 px-2 items-center'>
                        <div className='w-full md:w-1/2'>
                            <h1 className='text-4xl lg:text-6xl'>Plan Your <span className='text-blue-500 font-bold'>Perfect Trip</span> with Ease</h1>

                            <p className='mt-5'>Get detailed information on top destinations, must-try local foods, and cultural experiences. TourNest helps you create unforgettable travel plans—hassle-free.</p>

                            <Link className='btn btn-lg mt-8 bg-blue-500 text-white rounded-full hover:text-blue-500 hover:bg-white' to='/login'>Join Now</Link>
                        </div>
                        <div className='w-full md:w-1/2'>
                            <img src={headerBanner2} alt="headerBanner1" className='w-full'/>
                        </div>
                    </div>
                </div>

                <div>
                    <div className='flex flex-col md:flex-row gap-10 mt-25 mb-25 py-10 px-2 items-center'>
                        <div className='w-full md:w-1/2'>
                            <h1 className='text-4xl lg:text-6xl'><span className='text-blue-500 font-bold'>Experience</span> Culture, Nature & Heritage</h1> 

                            <p className='mt-5'>Dive into the rich history, vibrant traditions, and breathtaking nature of Bangladesh. With TourNest, every journey is more than just a trip—it’s a cultural adventure.</p> 

                           <Link className='btn btn-lg mt-8 bg-blue-500 text-white rounded-full hover:text-blue-500 hover:bg-white' to='/login'>Join Now</Link>
                        </div>
                        <div className='w-full md:w-1/2'>
                            <img src={headerBanner3} alt="headerBanner1" className='w-full'/>
                        </div>
                    </div>
                </div>
            </Slider>

        </div>
    );
};

export default Header;