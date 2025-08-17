import React from 'react';
import { useLoaderData } from 'react-router';
import { MdEmail, MdStarRate, MdVerified } from 'react-icons/md';
import { FaUserTie, FaLanguage, FaMapMarkedAlt } from 'react-icons/fa';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Loading';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const TourGuideProfile = () => {
    const tourGuide = useLoaderData();
    //const { user } = useAuth();

    //const axiosSecure = useAxiosSecure();
    const axiosInstance = useAxios();

    const {
        name,
        email,
        description,
        rating,
        experience,
        languages,
        specialties,
        photoURL
    } = tourGuide;

    const { data: stories = [], refetch, isLoading } = useQuery({
        queryKey: ['userStories', email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/getGuideStories/user?email=${email}`);
            return res.data;
        },
        enabled: !!email
    });

    // if (isLoading) return <Loading></Loading>;

    return (
        <div>
            <div className='text-center mt-35'>
                <h2 className='text-5xl font-semibold'> <span className='text-blue-500'>Tour Guide</span> Details</h2>
            </div>
            <div className="mx-auto py-12 mt-10 mb-10">
                <div className="shadow-2xl rounded-2xl flex flex-col md:flex-row items-center md:items-start gap-8 px-6 py-12">
                    <img
                        src={photoURL}
                        alt={name}
                        className="w-40 h-40 rounded-full object-cover shadow-md"
                    />
                    <div className="flex-1">
                        <h1 className="text-4xl font-bold mb-2 text-blue-500">{name}</h1>
                        <p className="flex items-center  mb-2">
                            <MdEmail className="mr-2 text-blue-500" /> {email}
                        </p>
                        <p className="mb-4 ">{description}</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm ">
                            <div className="flex items-center">
                                <MdStarRate className="text-yellow-500 mr-2" />
                                <span className="font-semibold">Rating:</span> {rating} / 5
                            </div>
                            <div className="flex items-center">
                                <FaUserTie className="text-green-600 mr-2" />
                                <span className="font-semibold">Experience:</span> {experience} years
                            </div>
                            <div className="flex items-start">
                                <FaLanguage className="text-purple-500 mr-2 mt-1" />
                                <div>
                                    <span className="font-semibold">Languages:</span>
                                    <ul className="list-disc list-inside ml-2">
                                        {languages.map((lang, index) => (
                                            <li key={index}>{lang}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <FaMapMarkedAlt className="text-pink-500 mr-2 mt-1" />
                                <div>
                                    <span className="font-semibold">Specialties:</span>
                                    <ul className="list-disc list-inside ml-2">
                                        {specialties.map((spec, index) => (
                                            <li key={index}>{spec}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div>
                <div className='flex flex-col gap-5 md:flex-row mb-20 items-center'>

                    <div className=' p-6 rounded-2xl shadow-2xl '>
                        <MdVerified className='text-blue-500' />
                        <h2 className='font-semibold text-md'>Expert Local Guides</h2>
                        <p className='mt-3 text-xs'>Our professional tour guides ensure authentic, safe, and immersive travel experiences tailored just for you.</p>
                    </div>

                    <div className=' p-6 rounded-2xl shadow-2xl '>
                        <MdVerified className='text-blue-500' />
                        <h2 className='font-semibold text-md'>Hassle-Free Booking</h2>
                        <p className='mt-3 text-xs'>From secure payments to instant confirmation, our seamless booking system makes travel stress-free.</p>
                    </div>


                    <div className='  p-6 rounded-2xl shadow-2xl '>
                        <MdVerified className='text-blue-500' />
                        <h2 className='font-semibold text-md'>Handpicked Packages</h2>
                        <p className='mt-3 text-xs'>We curate top-rated destinations with real user feedback to guarantee quality and unforgettable moments.</p>
                    </div>


                </div>
            </div>


            <div className='mb-30'>
                <h2 className='text-3xl font-semibold my-10'>Stories added from Tour Guide</h2>

                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                    {
                        stories.length == 0 ? "No stories added yet." :
                            stories.map(story => (
                                <div key={story._id} className="flex shadow-md rounded-xl p-6 gap-4 items-stretch">
                                    <div className="w-1/3">
                                        {story.tourPhotos?.[0] ? (
                                            <img
                                                src={story.tourPhotos[0]}
                                                alt="Tour banner"
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        ) : (
                                            <p className="text-gray-400 italic">No image</p>
                                        )}
                                    </div>
                                    <div className="w-2/3 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center gap-4 mb-4">
                                                <img src={story.postedPhotoURL} alt={story.postedBy} className="w-12 h-12 rounded-full" />
                                                <div>
                                                    <p className="font-semibold">{story.postedBy}</p>
                                                    <p className="text-sm">{story.postedByRole === 'user' ? 'Tourist' : 'Guide'}</p>
                                                </div>
                                            </div>
                                            <h3 className="text-xl font-bold mb-2">{story.name}</h3>
                                            <p className="mb-2"><strong>Destination:</strong> {story.tourDestination}</p>
                                            <p className="mb-2"><strong>Date:</strong> {new Date(story.tourDate).toDateString()}</p>
                                            <p className="mb-4"><strong>Duration:</strong> {story.tourDuration} days</p>
                                            <p className="line-clamp-4">{story.description}</p>
                                        </div>

                                    </div>
                                </div>
                            ))}
                </div>
            </div>



        </div>
    );
};

export default TourGuideProfile;