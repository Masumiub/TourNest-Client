import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useAxios from '../hooks/useAxios';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { MdCardTravel } from "react-icons/md";
import { BsFileEarmarkPerson } from "react-icons/bs";
import { TbReportMoney } from "react-icons/tb";
import { RiMapPinTimeLine } from "react-icons/ri";
import { PiBookOpenUserBold } from "react-icons/pi";
import { IoStarSharp } from "react-icons/io5";
import Loading from './Loading';


const TourismAndTravelGuide = () => {

    const [packages, setPackages] = useState([]);
    const axiosInstance = useAxios();

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const res = await axiosInstance.get('/packages/random');
                setPackages(res.data);
            } catch (error) {
                console.error('Error fetching random packages:', error);
            }
        };
        fetchPackages();
    }, []);

    const { data: guides = [], isLoading } = useQuery({
        queryKey: ['randomGuides'],
        queryFn: async () => {
            const res = await axiosInstance.get('/tourGuides/random');
            return res.data;
        }
    });

    if (isLoading) return <Loading></Loading>;


    return (
        <div className='mb-20'>
            <div className="max-w-7xl mx-auto text-center mb-12">
                <h2 className="text-5xl font-bold  mb-6">Tourism & Travel Guide </h2>
                <p className="">Experience the best of Bangladesh with a platform built for every traveler.</p>
            </div>
            <Tabs>
                <TabList>
                    <Tab>Our Packages</Tab>
                    <Tab>Meet Our Tour Guides</Tab>
                </TabList>

                <TabPanel>
                    <section className="py-16">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto">
                            {packages.map(pkg => (
                                <div key={pkg._id} className=" shadow-md rounded-xl overflow-hidden">
                                    <img src={pkg.banner} alt={pkg.title} className="w-full h-48 object-cover" />
                                    <div className="p-6">
                                        <button className='btn btn-xs bg-blue-50 border-1 border-blue-500 rounded-full text-blue-500'><MdCardTravel /> {pkg.tourType}</button>
                                        <button className='btn btn-xs bg-yellow-200 border-1 border-yellow-600 rounded-full text-yellow-600 ml-2'><IoStarSharp /> Hot</button>
                                        <h3 className="text-xl font-bold mt-2">{pkg.title}</h3>

                                        <div className='flex mt-2 items-center gap-1'>
                                            <TbReportMoney />
                                            <p className="  font-semibold">৳ {pkg.price}</p>
                                        </div>


                                        <div className='flex items-center justify-between  mt-2 '>
                                            <div className='flex gap-1 items-center'>
                                                <RiMapPinTimeLine />
                                                <p className="">Duration : {pkg.duration}</p>
                                            </div>
                                            <div>
                                                <p className=" ">⭐ {pkg.rating}/5</p>
                                            </div>

                                        </div>

                                        <Link to={`/packages/${pkg._id}`}>
                                            <button className="btn mt-4 bg-blue-500 text-white w-full hover:bg-white hover:text-blue-500 border border-blue-500 rounded-full">
                                                <PiBookOpenUserBold />View Package
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </TabPanel>

                <TabPanel>
                    <div className="mx-auto  py-10">

                        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {guides.map(guide => (
                                <div
                                    key={guide._id}
                                    className=" rounded-xl shadow-lg p-6 flex flex-col items-center text-center"
                                >
                                    <img
                                        src={guide.photoURL}
                                        alt={guide.name}
                                        className="w-28 h-28 rounded-full object-cover mb-4"
                                    />
                                    <h3 className="text-xl font-semibold">{guide.name}</h3>
                                    {/* <p className=" text-sm mb-2">{guide.email}</p>
                                    <p className="text-sm">{guide.description}</p> */}
                                    <p className="text-yellow-500 font-bold mt-2">⭐ {guide.rating} / 5</p>
                                    <p className="text-sm text-gray-500">Experience: {guide.experience} years</p>
                                    <Link
                                        to={`/tourGuide/${guide._id}`}
                                        className="btn btn-sm mt-4 bg-blue-500 text-white hover:bg-white hover:text-blue-500 rounded-full"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default TourismAndTravelGuide;