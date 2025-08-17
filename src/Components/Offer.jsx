import React from 'react';
import { Link } from 'react-router';
import Lottie from 'lottie-react';
import Animation from '../assets/Man Planning A Sightseeing Route.json';

const Offer = () => {
    return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 bg-linear-to-r from-sky-500 to-blue-700 px-10 py-25 rounded-2xl shadow-lg my-20">
      
      {/* Left: Text Content */}
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4">
          🎉 Book 3 Trips & Get 15% Off!
        </h2>
        <p className="mb-6 text-white">
          Your loyalty matters to us. As a thank-you for booking 3 tours, you’ll automatically receive a 15% discount on your next adventure!
        </p>
        <Link to="/allTrips">
          <button className="btn bg-white text-blue-500 px-6 py-2 rounded-full">
            Explore Trips
          </button>
        </Link>
      </div>

      {/* Right: Lottie Animation */}
      <div className="flex-1">
        <Lottie animationData={Animation} loop={true} className="w-[300px] md:w-[400px] mx-auto" />
      </div>

    </div>
    );
};

export default Offer;