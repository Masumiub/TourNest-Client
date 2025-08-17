import React from 'react';
import masumPhoto from '../../assets/masumPhoto.jpg'
import { MdOutlineAttachEmail } from 'react-icons/md';
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaLocationDot } from 'react-icons/fa6';
import { FaLinkedinIn } from 'react-icons/fa';
import { FiGithub } from "react-icons/fi";
import { RxDiscordLogo } from "react-icons/rx";


const AboutUs = () => {
    return (
        <div className="mx-auto py-12 mt-35 mb-20">
            <h2 className="text-5xl font-bold mb-8 text-center">About the Developer</h2>

            <div className='mt-10 flex flex-col lg:flex-row gap-10'>
                <div className='w-full p-3 lg:2/3'>
                    <h2>Hello! This is</h2>
                    <h1 className='text-3xl font-semibold'>MASUM MUSFIQUE</h1>
                    <h3 className='text-xl '>Full-stack Web Developer</h3>

                    <p className='mt-8'>Hi! I'm Masum Musfique — a passionate and detail-oriented Full-Stack Web Developer based in Dhaka, Bangladesh. I truly enjoy building clean, responsive user interfaces that not only look good but also feel intuitive. I’ve worked on a range of personal and collaborative projects using React, JavaScript, DaisyUI, and Firebase Authentication. I’m also confident working with backend technologies like Node.js, Express.js, and MongoDB, giving me a full-picture understanding of modern web development.</p>
                    <p className='mt-5'>Outside of programming, I have a creative side — I love painting and graphic design. These hobbies help me think visually and bring a strong sense of aesthetics to my UI work. Whether it's designing a smooth user flow or selecting the perfect color palette, I enjoy blending creativity with code.</p>

                    <div className='mt-10 flex gap-4'>
                        <a href="https://masumdev.netlify.app/projects" target='_blank' className='btn rounded-full'>Show Project</a>

                        <a href="https://masumdev.netlify.app/" target='_blank' className='btn rounded-full bg-blue-500 text-white'>Visit Website</a>
                    </div>

                    <div className='mt-10'>
                        <h3 className='text-xl font-bold'>Contact Me</h3>

                        <div>
                            <h3 className='text-2xl'>Personal Information:</h3>

                            <div className='flex gap-4 mt-5 items-center'>
                                <div className='p-5 bg-blue-200 rounded-lg'><MdOutlineAttachEmail size={25} className='text-black'/></div>
                                <div>
                                    <p className='font-bold'>Email</p>
                                    <p>musfiquemasum@gmail.com</p>
                                </div>
                            </div>

                            <div className='flex gap-4 mt-8 items-center'>
                                <div className='p-5 bg-blue-200 rounded-lg'><BiSolidPhoneCall size={25} className='text-black'/></div>
                                <div>
                                    <p className='font-bold'>Call/WhatsApp</p>
                                    <p>01632225325</p>
                                </div>
                            </div>

                            <div className='flex gap-4 mt-8 items-center'>
                                <div className='p-5 bg-blue-200 rounded-lg'><FaLocationDot size={25} className='text-black'/></div>
                                <div>
                                    <p className='font-bold'>Address</p>
                                    <p>1217/1/A, East Monipur, Mirpur, Dhaka - 16</p>
                                </div>
                            </div>



                            <p className='mt-8 text-2xl'>Follow me: </p>
                            <div className='flex mt-2 gap-5'>
                                <p className='p-3 rounded-full border-1 hover:bg-blue-200'> <a href="https://www.linkedin.com/in/musfique-77-masum/" target="_blank" ><FaLinkedinIn size={20} /></a> </p>
                                <p className='p-3 rounded-full border-1 hover:bg-blue-200'> <a href="https://github.com/Masumiub" target="_blank"><FiGithub size={20} /></a> </p>
                                <p className='p-3 rounded-full border-1 hover:bg-blue-200'> <a href="https://discord.com/users/masummusfique2789" target="_blank" ><RxDiscordLogo size={20} /></a></p>
                            </div>

                        </div>

                    </div>

                </div>

                <div className='w-full p-3 lg:1/3 flex justify-center'>
                    <img src={masumPhoto} alt="masumPhoto" className='rounded-full h-180 object-cover' />
                </div>
            </div>

            <div className='mt-15 p-3'>
                <h2 className='text-4xl font-semibold'>Some Notable Projects</h2>
            </div>

            <div className='mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 p-3'>

                <div>
                    <div className="card bg-base-100 shadow-sm h-135">
                        <figure >
                            <img
                                src="https://media.licdn.com/dms/image/v2/D5622AQE9ONqU6yC1sg/feedshare-shrink_2048_1536/B56ZedZQYqHoAo-/0/1750692336464?e=1753920000&v=beta&t=vR66C545Yx_FaowQ6VoHmuDNbFN0UxS4FZy_vYtGC6A"
                                alt="Shoes" className='object-cover'/>
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">Online Study Room</h2>
                            <p>Online Study Room, a collaborative web application built to enhance online group study experiences. Every registered user becomes a friend, allowing open collaboration, assignment sharing, and peer grading.</p>
                            <div className="card-actions mt-5">
                                 <a href='https://onlinestudyroom-all.web.app/' className="btn bg-blue-500 rounded-full text-white" target='_blank'>View Project</a>
                            </div>
                        </div>
                    </div>
                </div>


                <div>
                    <div className="card bg-base-100 shadow-sm h-135">
                        <figure >
                            <img
                                src="https://media.licdn.com/dms/image/v2/D5622AQFwRFcRQ_YeCg/feedshare-shrink_2048_1536/B56ZedQxu8HoAw-/0/1750690112441?e=1753920000&v=beta&t=VQyhuzuIFUtlX_bvg0q4ihh60q7TmszbT57VYUPrpYk"
                                alt="Shoes" className='object-cover'/>
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">FavFreelancer</h2>
                            <p>FavFreelancer, a full-stack web application that connects freelancers with tasks, allowing users to add, manage, and bid on freelance projects in real-time.</p>
                            <div className="card-actions mt-5">
                                <a href='https://favfreelancer-client.web.app/' className="btn bg-blue-500 rounded-full text-white" target='_blank'>View Project</a>
                            </div>
                        </div>
                    </div>
                </div>


                <div>
                    <div className="card bg-base-100 shadow-sm h-135">
                        <figure >
                            <img
                                src="https://media.licdn.com/dms/image/v2/D5622AQE6N91yYJuSzQ/feedshare-shrink_2048_1536/B56Zeby6jIGoAs-/0/1750665507219?e=1753920000&v=beta&t=-qlTRH8EH4_SSlt6vM45QiMy6jo_ja01Z1zZVHXKxmo"
                                alt="Shoes" className='object-cover' />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">Job Seeker</h2>
                            <p>Job Seeker, a responsive and intuitive job listing platform designed to help users explore job opportunities across multiple companies — all in one place.</p>
                            <div className="card-actions mt-5">
                                <a href='https://jobseekers-1a20c.web.app/' className="btn bg-blue-500 rounded-full text-white" target='_blank'>View Project</a>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>

    );
};

export default AboutUs;