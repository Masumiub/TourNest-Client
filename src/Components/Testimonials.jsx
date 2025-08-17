import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const reviews = [
    {
        name: "Ayesha Rahman",
        username: "@jack",
        body: "Booking with TourNest was the best decision! The experience was smooth and exciting.",
        img: "https://avatar.vercel.sh/jack",
    },
    {
        name: "Tanvir Hasan",
        username: "@jill",
        body: "I explored Bandarban through this site. Everything was perfectly arranged!",
        img: "https://avatar.vercel.sh/jill",
    },
    {
        name: "Nusrat Jahan",
        username: "@john",
        body: "Easy booking and friendly guides. Highly recommend for stress-free travel.",
        img: "https://avatar.vercel.sh/john",
    },
    {
        name: "Sajid Mahmud",
        username: "@jane",
        body: "Loved the tour planning and support. A truly unforgettable experience!",
        img: "https://avatar.vercel.sh/jane",
    },
    {
        name: "Mahiya Chowdhury",
        username: "@jenny",
        body: "Very responsive team and well-planned trips. Will book again soon!",
        img: "https://avatar.vercel.sh/jenny",
    },
    {
        name: "Fahim Rahman",
        username: "@james",
        body: "The best trip I've ever had in Cox's Bazar. Great service and communication.",
        img: "https://avatar.vercel.sh/james",
    },
    {
        name: "Rafiq Islam",
        username: "@jane",
        body: "Affordable and reliable travel platform. Booking was super quick.",
        img: "https://avatar.vercel.sh/jane",
    },
    {
        name: "Tasnim Hossain",
        username: "@jenny",
        body: "Really loved the Sundarbans trip package! Everything was on time.",
        img: "https://avatar.vercel.sh/jenny",
    },
    {
        name: "Shahriar Kabir",
        username: "@james",
        body: "Fantastic support and budget-friendly options. Five stars!",
        img: "https://avatar.vercel.sh/james",
    },
];


const reviews2nd = [
    {
        name: "Farzana Akter",
        username: "@jack",
        body: "TourNest made our Sylhet trip magical. Everything was so well managed!",
        img: "https://avatar.vercel.sh/jack",
    },
    {
        name: "Aminul Islam",
        username: "@jill",
        body: "The Sundarbans tour was perfectly organized. I felt very safe throughout.",
        img: "https://avatar.vercel.sh/jill",
    },
    {
        name: "Lubna Karim",
        username: "@john",
        body: "Loved the seamless booking process. Will definitely travel with them again.",
        img: "https://avatar.vercel.sh/john",
    },
    {
        name: "Mahbub Alam",
        username: "@jane",
        body: "Everything from pickup to drop-off was flawless. Highly impressed!",
        img: "https://avatar.vercel.sh/jane",
    },
    {
        name: "Nashita Jamil",
        username: "@jenny",
        body: "We visited Sajek Valley with their help. The guide was fantastic!",
        img: "https://avatar.vercel.sh/jenny",
    },
    {
        name: "Sifat Hossain",
        username: "@james",
        body: "My family loved the whole tour. Thanks to the amazing coordination!",
        img: "https://avatar.vercel.sh/james",
    },
    {
        name: "Rumana Ferdous",
        username: "@jane",
        body: "The trip was affordable and enjoyable. Very friendly support staff.",
        img: "https://avatar.vercel.sh/jane",
    },
    {
        name: "Rayhan Ahmed",
        username: "@jenny",
        body: "Super clean transportation and comfy stay. Totally worth the money!",
        img: "https://avatar.vercel.sh/jenny",
    },
    {
        name: "Tanjina Haque",
        username: "@james",
        body: "I was amazed at the fast response and clear guidance. 10/10 experience.",
        img: "https://avatar.vercel.sh/james",
    },
];


const Testimonials = () => {
    return (
        <div className='overflow-x-hidden'>
            <div className='text-center mt-20'>
                <h2 className='text-5xl font-semibold'>Testimonials</h2>
                <p className='mt-2'>Lets see what our happy tourist are saying.</p>
            </div>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper mt-10"
            >
                {
                    reviews.map((review, idx) => (
                        <SwiperSlide key={idx}>
                            <div className="border border-base-300 px-6 flex gap-4 rounded-2xl shadow-sm items-center justify-center h-40">
                                <div>
                                    <img src={review.img} alt="user" className="w-13 h-13 rounded-full object-cover" />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <h2 className="font-bold">{review.name}</h2>
                                    <p className="text-xs text-gray-500">Tourist</p>
                                    <p className="text-xs mt-2 leading-snug line-clamp-3">{review.body}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }

            </Swiper>

            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                    reverseDirection: true,
                }}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper mt-10"
            >
                {
                    reviews2nd.map((review, idx) => (
                        <SwiperSlide key={idx}>
                            <div className="border border-base-300 px-6 flex gap-4 rounded-2xl shadow-sm items-center justify-center h-40">
                                <div>
                                    <img src={review.img} alt="user" className="w-13 h-13 rounded-full object-cover" />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <h2 className="font-bold">{review.name}</h2>
                                    <p className="text-xs text-gray-500">Tourist</p>
                                    <p className="text-xs mt-2 leading-snug line-clamp-3">{review.body}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }

            </Swiper>
        </div>
    );
};

export default Testimonials;
