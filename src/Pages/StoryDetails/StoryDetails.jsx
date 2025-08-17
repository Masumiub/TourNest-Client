import React from 'react';
import { useLoaderData } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';


const StoryDetails = () => {

    const story = useLoaderData();

    return (
        <div className='mt-45 mb-20' >

            <div className='mb-8'>
                {story.tourPhotos?.length > 0 ? (
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
                            {story.tourPhotos.map((photo, idx) => (
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
                ) : (
                    <p className="text-gray-400 italic">No image available</p>
                )}
            </div>

            <h3 className="text-4xl font-bold mb-5">{story.name}</h3>

            <div className="flex items-center gap-4 mb-4">
                <img src={story.postedPhotoURL} alt={story.postedBy} className="w-12 h-12 rounded-full" />
                <div>
                    <p className="font-semibold">{story.postedBy}</p>
                    <p className="text-sm ">{story.postedByRole === 'user' ? 'Tourist' : 'Guide'}</p>
                </div>
            </div>


            <p className="mb-2"><strong>Destination:</strong> {story.tourDestination}</p>
            <p className="mb-2"><strong>Date:</strong> {new Date(story.tourDate).toDateString()}</p>
            <p className="mb-4"><strong>Duration:</strong> {story.tourDuration} days</p>
            <p className="line-clamp-4 ">{story.description}</p>
        </div>
    );
};

export default StoryDetails;