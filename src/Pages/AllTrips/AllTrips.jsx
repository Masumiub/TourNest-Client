import React, { useState, useMemo } from 'react';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { MdCardTravel } from "react-icons/md";
import { TbReportMoney } from "react-icons/tb";
import { RiMapPinTimeLine } from "react-icons/ri";
import { PiBookOpenUserBold } from "react-icons/pi";
import CardSlider from '../../Components/CardSlider';
import Loading from '../../Components/Loading';

const AllTrips = () => {
    const axiosInstance = useAxios();
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const { data, isLoading } = useQuery({
        queryKey: ['allTrips', page, limit],
        queryFn: async () => {
            const res = await axiosInstance.get(`/allTrips?page=${page}&limit=${limit}`);
            return res.data;
        }
    });

    //const packages = data?.result || [];
    const totalCount = data?.totalCount || 0;
    const totalPages = Math.ceil(totalCount / limit);

    const filteredPackages = useMemo(() => {
        const allPackages = data?.result || [];

        if (!searchTerm) return allPackages;

        const term = searchTerm.toLowerCase();
        return allPackages.filter(pkg =>
            pkg.title.toLowerCase().includes(term) ||
            pkg.tourType.toLowerCase().includes(term)
        );
    }, [searchTerm, data?.result]);

    if (isLoading) return <Loading />;

    return (
        <div className="mx-auto py-12 mt-35 mb-20">

            <div className='flex flex-col md:flex-row gap-10 items-center'>
                <div className='p-3 w-full md:w-2/3'>
                    <h2 className="text-5xl font-bold mb-8">Trips Packages</h2>
                    <p>Explore our curated travel packages. Find adventures that match your style!</p>
                    <label className="input mt-5">
                        <input
                            type="search"
                            className="grow"
                            placeholder="Search by title or tour type 🔎"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </label>
                </div>
                <div className='p-3 hidden md:block md:w-1/3'>
                    <CardSlider />
                </div>
            </div>


            <section className="py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
                    {filteredPackages.length > 0 ? (
                        filteredPackages.map(pkg => (
                            <div key={pkg._id} className="shadow-md rounded-xl overflow-hidden">
                                <img src={pkg.banner} alt={pkg.title} className="w-full h-48 object-cover" />
                                <div className="p-6">
                                    <button className='btn btn-xs bg-blue-50 border-blue-500 rounded-full text-blue-500'>
                                        <MdCardTravel /> {pkg.tourType}
                                    </button>
                                    <h3 className="text-xl font-bold mt-2">{pkg.title}</h3>
                                    <div className='flex mt-2 items-center gap-1'>
                                        <TbReportMoney />
                                        <p className="font-semibold">৳ {pkg.price}</p>
                                    </div>
                                    <div className='flex items-center justify-between mt-2'>
                                        <div className='flex gap-1 items-center'>
                                            <RiMapPinTimeLine />
                                            <p>Duration : {pkg.duration}</p>
                                        </div>
                                        <p>⭐ {pkg.rating}/5</p>
                                    </div>
                                    <Link to={`/packages/${pkg._id}`}>
                                        <button className="btn mt-4 bg-blue-500 text-white w-full hover:bg-white hover:text-blue-500 border border-blue-500 rounded-full">
                                            <PiBookOpenUserBold /> View Package
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-4xl text-center col-span-full">No such trip is found!</p>
                    )}
                </div>
            </section>


            <div className="flex flex-wrap gap-4 justify-center items-center">
                <button
                    className="btn btn-outline"
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                >
                    Previous
                </button>

                <div className="join">
                    {Array.from({ length: totalPages }, (_, idx) => (
                        <input
                            key={idx + 1}
                            type="radio"
                            name="pagination"
                            className="join-item btn btn-square"
                            aria-label={`${idx + 1}`}
                            checked={page === idx + 1}
                            onChange={() => setPage(idx + 1)}
                        />
                    ))}
                </div>

                <button
                    className="btn btn-outline"
                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                >
                    Next
                </button>

                <select
                    className="select select-bordered w-35"
                    value={limit}
                    onChange={(e) => setLimit(parseInt(e.target.value))}
                >
                    <option value={10}>10 items</option>
                    <option value={20}>20 items</option>
                    <option value={50}>50 items</option>
                </select>
            </div>
        </div>
    );
};

export default AllTrips;
