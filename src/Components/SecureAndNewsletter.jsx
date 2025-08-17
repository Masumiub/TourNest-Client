import React from 'react';
import securedPayment from '../assets/secured payment.png'
import newsletter from '../assets/newsletter.png'
import { motion } from "motion/react";
import { Link } from 'react-router';


const SecureAndNewsletter = () => {
    return (
        <section className="py-12 bg-base-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {/* Left Column: Secure Booking */}
                <div className="flex flex-col items-center justify-center text-center px-10 py-25 bg-linear-to-b from-sky-500 to-blue-700 rounded-xl h-full text-white shadow-2xl">
                    <div>
                        <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4">🔒 Secured  Payment</h2>
                        <p className="text-sm md:text-base mb-6">
                            Your safety is our priority. Book your tours with peace of mind using our encrypted payment gateway.
                            All transactions are protected, and your information is secure.
                        </p>
 <Link className='btn btn-lg mt-8 bg-blue-500 text-white rounded-full hover:text-blue-500 hover:bg-white' to='/allTrips'>Explore Now</Link>
                        <motion.img src={securedPayment}
                            alt="Secure Booking"
                            animate={{ y: [50, 70, 50] }}
                            transition={{ duration: 5, repeat: Infinity }}
                            className="w-[290px] md:w-[300px] lg:w-[450px] mx-auto" />
                    </div>
                </div>

                {/* Right Column: Newsletter */}
                <div className="flex flex-col items-center justify-center text-center px-10 py-25 bg-linear-to-t from-base-300 to-base-100 rounded-xl h-full shadow-2xl">
                    <div>
                        <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4">📬 Join Our <span className='text-blue-500'>Newsletter</span> </h2>
                        <p className="text-sm md:text-base mb-6">
                            Stay updated with the latest tour offers, travel tips, and discounts. No spam, just pure travel inspiration!
                        </p>
                        <Link className='btn btn-lg mt-8 bg-blue-500 text-white rounded-full hover:text-blue-500 hover:bg-white' to='/login'>Join Now</Link>
                        <img src={newsletter} alt="newsletter" className="w-[290px] md:w-[300px] lg:w-[450px] mx-auto" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SecureAndNewsletter;