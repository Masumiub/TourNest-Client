import React from 'react';
import { FaMapMarkedAlt, FaUtensils, FaUsers } from 'react-icons/fa';
import video from '../assets/tournest.mp4'


const Overview = () => {
    return (
        <section className="py-16 px-4 md:px-8 mb-20">
            <div className="max-w-7xl mx-auto text-center mb-12">
                <h2 className="text-5xl font-bold  mb-6">Why Choose <span className="text-blue-500">TourNest</span></h2>
                <p className="">Experience the best of Bangladesh with a platform built for every traveler.</p>
            </div>

            <div className='w-full mb-8'>
                <video className="w-full rounded-lg" controls autoPlay muted>
                    <source src={video} type="video/mp4" />
                    Your browser does not support HTML video.
                </video>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                {/* Card 1 */}
                <div className="shadow-md rounded-2xl px-6 py-15 flex flex-col items-center text-center h-full">
                    <FaMapMarkedAlt className="text-blue-500 text-5xl mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Comprehensive Destination Guide</h3>
                    <p className="text-sm">
                        Explore popular spots and hidden gems across Bangladesh with detailed, up-to-date travel insights.
                    </p>
                </div>

                {/* Card 2 */}
                <div className=" shadow-md rounded-2xl px-6 py-15 flex flex-col items-center text-center h-full">
                    <FaUtensils className="text-blue-500 text-5xl mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Local Culture & Cuisine</h3>
                    <p className="text-sm">
                        Discover authentic food, traditions, and experiences that make each region of Bangladesh unique.
                    </p>
                </div>

                {/* Card 3 */}
                <div className=" shadow-md rounded-2xl px-6 py-15 flex flex-col items-center text-center h-full">
                    <FaUsers className="text-blue-500 text-5xl mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Built for Every Traveler</h3>
                    <p className="text-sm">
                        Whether you're a solo adventurer or planning a family trip, TourNest provides the tools to plan it all.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Overview;
