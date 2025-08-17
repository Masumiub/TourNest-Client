import React from 'react';
import { MdCardTravel } from 'react-icons/md';
import { Link, useLoaderData } from 'react-router';
import { FaPaperPlane } from "react-icons/fa";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';


const PackageDetails = () => {
    const pkg = useLoaderData();
    //console.log(pkg.banner)

    return (
        <div className="mt-35 mx-auto py-10 px-2">

            {pkg.photos?.length > 0 && (
                <div className="mt-6">
                    <Swiper
                        modules={[Autoplay]}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        spaceBetween={16}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                            },
                            640: {
                                slidesPerView: 2,
                            },
                        }}
                        loop={true}
                    >
                        {pkg.photos.map((photo, idx) => (
                            <SwiperSlide key={idx}>
                                <img
                                    src={photo}
                                    alt={`Tour photo ${idx + 1}`}
                                    className="rounded-lg w-full h-56 object-cover"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}

            <h1 className="text-4xl font-bold mb-2 mt-10">{pkg.title}</h1>
            <button className='btn btn-sm bg-blue-50 border-1 border-blue-500 rounded-full text-blue-500'><MdCardTravel /> {pkg.tourType}</button>
            <p className=" mt-4 mb-4">{pkg.description}</p>
            <p className="text-lg font-semibold text-blue-600 mb-4">৳ {pkg.price}</p>

            <h2 className="text-2xl font-bold mt-6 mb-2">Tour Plan</h2>
            <p className=" mb-3">{pkg.tourPlan}</p>

            <h2 className="text-2xl font-bold mt-6 mb-2">Day-wise Activities</h2>
            <ul className="list-disc list-inside  space-y-1">
                {pkg.days.map((day, index) => (
                    <li key={index}>{day}</li>
                ))}
            </ul>




            <div className="mt-10">
                <Link
                    to={`/bookingForm/${pkg._id}`}
                    className="btn btn-lg bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-800"
                >
                    <FaPaperPlane /> Book Now
                </Link>
            </div>

        </div>
    );
};

export default PackageDetails;
