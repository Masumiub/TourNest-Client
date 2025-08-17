import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { useNavigate } from 'react-router';
import { Link } from 'react-router';
import useAuth from '../hooks/useAuth';
import useAxios from '../hooks/useAxios';
import Loading from './Loading';

const TouristStories = () => {
    const axiosInstance = useAxios();
    const navigate = useNavigate();
    const { user } = useAuth();

    const { data: stories = [], isLoading } = useQuery({
        queryKey: ['randomStories'],
        queryFn: async () => {
            const res = await axiosInstance.get('/stories/random');
            return res.data;
        }
    });

    const handleShare = (storyId) => {
        if (!user) {
            navigate('/login');
        }
    };

    if (isLoading) return <Loading></Loading>;

    return (
        <div className="mx-auto py-12">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-5">
                <h2 className="text-5xl font-bold">Traveler <span className='text-blue-500'>Stories</span></h2>
                <Link to="/allStories" className="btn border-1 border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white">
                    View All Stories
                </Link>
            </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {stories.map(story => (
          <div key={story._id} className="flex shadow-md rounded-xl p-6 gap-4 items-stretch ">
            <div className='w-1/3'>
              <img src={story.tourPhotos[0]} alt="banner" className='w-full h-full object-cover rounded-lg' />
            </div>
            <div className='w-2/3 flex flex-col justify-between'>
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <img src={story.postedPhotoURL} alt={story.postedBy} className="w-12 h-12 rounded-full" />
                  <div>
                    <p className="font-semibold">{story.postedBy}</p>
                    <p className="text-sm ">{story.postedByRole === 'user' ? 'Tourist' : 'Guide'}</p>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{story.name}</h3>
                <p className="mb-2"><strong>Destination:</strong> {story.tourDestination}</p>
                <p className="mb-2"><strong>Date:</strong> {new Date(story.tourDate).toDateString()}</p>
                <p className="mb-4"><strong>Duration:</strong> {story.tourDuration} days</p>
                <p className="line-clamp-4 ">{story.description}</p>
              </div>

              <div className="mt-4 flex justify-start items-center">
                {user ? (
                  <FacebookShareButton
                    url={`https://yourdomain.web.app/story/${story._id}`}
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
              </div>
            </div>
          </div>
        ))}
      </div>
        </div>
    );
};

export default TouristStories;