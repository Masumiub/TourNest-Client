import React, { useState } from 'react';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { Link, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';
import Loading from '../../Components/Loading';

const AllStories = () => {
    const axiosInstance = useAxios();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const { data, isLoading } = useQuery({
        queryKey: ['allStories', page, limit],
        queryFn: async () => {
            const res = await axiosInstance.get(`/stories?page=${page}&limit=${limit}`);
            return res.data;
        }
    });

    const stories = data?.stories || [];
    const totalCount = data?.totalCount || 0;
    const totalPages = Math.ceil(totalCount / limit);

    const handleShare = (storyId) => {
        if (!user) navigate('/login');
    };

    if (isLoading) return <Loading />;

    return (
        <div className="mx-auto py-12 mt-35 mb-20">
            <h2 className="text-5xl font-bold mb-8 text-center">All Tourist Stories</h2>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 py-16">
                {stories.map(story => (
                    <div key={story._id} className="flex shadow-md rounded-xl p-6 gap-4 items-stretch">
                        <div className='w-1/3'>
                            {story.tourPhotos?.[0] ? (
                                <img
                                    src={story.tourPhotos[0]}
                                    alt="Tour banner"
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            ) : (
                                <p className="text-gray-400 italic">No image available</p>
                            )}
                        </div>
                        <div className='w-2/3 flex flex-col justify-between'>
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
                                <p className="line-clamp-4">{story.description}</p>
                            </div>
                            <div className="mt-4 flex gap-2">
                                {user ? (
                                    <FacebookShareButton
                                        url={`https://tournest-bd.web.app/story/${story._id}`}
                                        quote={story.name}
                                        hashtag="#TourNest"
                                        className="flex items-center gap-2"
                                    >
                                        <FacebookIcon size={32} round />
                                        <span className="text-sm">Share</span>
                                    </FacebookShareButton>
                                ) : (
                                    <button onClick={() => handleShare(story._id)} className="btn btn-sm bg-blue-500 text-white rounded-full">
                                        Login to Share
                                    </button>
                                )}
                                <Link className="btn btn-sm rounded-full" to={`/storyDetails/${story._id}`}>
                                    Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination UI */}
            <div className="flex items-center justify-center gap-4 mt-8">
                <button
                    className="btn btn-outline"
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                >
                    Previous
                </button>

                {[...Array(totalPages).keys()].map(num => (
                    <button
                        key={num}
                        onClick={() => setPage(num + 1)}
                        className={`btn  ${page === num + 1 ? 'btn-primary' : 'btn-outline'}`}
                    >
                        {num + 1}
                    </button>
                ))}

                <button
                    className="btn btn-outline"
                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                >
                    Next
                </button>

                <select
                    value={limit}
                    onChange={(e) => setLimit(parseInt(e.target.value))}
                    className="select select-bordered w-35"
                >
                    <option value={10}>10 items</option>
                    <option value={20}>20 items</option>
                    <option value={50}>50 items</option>
                </select>
            </div>
        </div>
    );
};

export default AllStories;
