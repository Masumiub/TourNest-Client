import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards, Autoplay } from 'swiper/modules';
import useAxios from '../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { PiBookOpenUserBold } from 'react-icons/pi';

const CardSlider = () => {


    const axiosInstance = useAxios();

    const { data: packages = [], isLoading } = useQuery({
        queryKey: ['allPackages'],
        queryFn: async () => {
            const res = await axiosInstance.get('/allTripsCard');
            return res.data;
        }
    });

    if (isLoading) return <p className="text-center py-10">Loading Trips...</p>;


    return (
        <>
            <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards, Autoplay]}
                autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                }}
                className="mySwiper"
            >
                {
                    packages.map((pkg) => (
                        <SwiperSlide key={pkg._id}>
                            <div className="overflow-hidden bg-white text-slate-500 shadow-md shadow-slate-200 rounded-2xl">

                                <figure className="relative rounded-2xl">
                                    <img
                                        src={pkg.banner}
                                        alt="card image"
                                        className="aspect-video w-full"
                                    />

                                    <figcaption className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-900 p-6 text-white">
                                        <h3 className="text-2xl font-medium ">{pkg.title}</h3>
                                        <p className="text-sm opacity-75"> {pkg.duration}</p>

                                        <Link to={`/packages/${pkg._id}`}>
                                            <button className="btn btn-xs mt-4 bg-blue-500 text-white hover:bg-white hover:text-blue-500 border border-blue-500 rounded-full">
                                                <PiBookOpenUserBold />View Package
                                            </button>
                                        </Link>
                                    </figcaption>
                                </figure>
                            </div>

                        </SwiperSlide>)
                    )
                }


                {/* <SwiperSlide>
                    <div className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
                        
                        <figure className="relative">
                            <img
                                src="https://picsum.photos/id/100/800/600"
                                alt="card image"
                                className="aspect-video w-full"
                            />
                            <figcaption className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-900 p-6 text-white">
                                <h3 className="text-lg font-medium ">Slide 2</h3>
                                <p className="text-sm opacity-75"> By George, jun 3 2024</p>
                            </figcaption>
                        </figure>
                    </div>
                    
                </SwiperSlide>
                <SwiperSlide>
                                        <div className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
                        
                        <figure className="relative">
                            <img
                                src="https://picsum.photos/id/100/800/600"
                                alt="card image"
                                className="aspect-video w-full"
                            />
                            <figcaption className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-900 p-6 text-white">
                                <h3 className="text-lg font-medium ">Slide 3</h3>
                                <p className="text-sm opacity-75"> By George, jun 3 2025</p>
                            </figcaption>
                        </figure>
                    </div>
                    
                </SwiperSlide> */}

            </Swiper>
        </>
    );
};

export default CardSlider;