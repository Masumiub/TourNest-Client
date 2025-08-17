import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { MdBookmarkAdded } from "react-icons/md";
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';
import { useNavigate, useParams } from 'react-router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import './BookingForm.css'
import Lottie from "lottie-react";
import Img from '../../assets/loading.json'
import Swal from 'sweetalert2';
import { MdVerified } from "react-icons/md";
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';



const BookingForm = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const axiosInstance = useAxios();
    const axiosSecure = useAxiosSecure();

    const { register, handleSubmit, setValue, reset, control } = useForm();
    const [packageData, setPackageData] = useState(null);

    const [tourGuides, setTourGuides] = useState([]);
    const [selectedGuideEmail, setSelectedGuideEmail] = useState('');

    const { width, height } = useWindowSize();
    const [showConfetti, setShowConfetti] = useState(false);


    const navigate = useNavigate()

    useEffect(() => {
        const fetchGuides = async () => {
            try {
                const res = await axiosInstance.get('/tourGuides');
                setTourGuides(res.data);
            } catch (error) {
                console.error('Failed to fetch tour guides:', error);
            }
        };
        fetchGuides();
    }, [axiosInstance]);

    //console.log(tourGuides)
    //console.log(selectedGuideEmail)

    useEffect(() => {
        const fetchPackage = async () => {
            try {
                const res = await axiosInstance.get(`/packages/${id}`);
                setPackageData(res.data);
                setValue('packageName', res.data.title);
                setValue('packagePrice', res.data.price);
            } catch (error) {
                console.error('Failed to fetch package:', error);
            }
        };

        fetchPackage();
    }, [id, axiosInstance, setValue]);


    const onSubmit = async (data) => {
        const booking = {
            touristName: user.displayName,
            email: user.email,
            profilePhoto: user.photoURL,
            packageId: id,
            packageName: data.packageName,
            price: data.packagePrice,
            guideName: data.guideName,
            guideNameEmail: selectedGuideEmail,
            tourDate: data.tourDate,
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        try {
            // Post the booking
            const res = await axiosSecure.post('/bookings', booking);

            // Fetch total booking count (including the new one)
            const bookingRes = await axiosSecure.get(`/bookings?email=${user.email}`);
            const userBookingCount = bookingRes.data.totalCount;

            //console.log('Total bookings:', userBookingCount);

            if (userBookingCount >= 3) {
                setShowConfetti(true);
                Swal.fire({
                    title: '🎉 Congratulations!',
                    html: 'You have booked 3 or more tours! Thanks for choosing us!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2500
                });

                setTimeout(() => {
                    setShowConfetti(false);
                    navigate('/allTrips');
                }, 4500);
                return;
            } else {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Thanks! Your Booking has been confirmed!",
                    showConfirmButton: false,
                    timer: 1500
                });
            }

            navigate('/allTrips');
        } catch (error) {
            console.error('Booking failed:', error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Failed to book!",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };



    return (

        <div>
            {showConfetti && <Confetti width={width} height={height} />}
            <h2 className="text-5xl font-bold mt-35 text-center mb-10">Confirm Booking</h2>

            <div className='flex flex-col gap-8 lg:flex-row '>
                <div className="px-6 py-10   rounded-xl mb-20 w-full lg:w-1/2">

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label className="block mb-1 font-medium">Tourist Name</label>
                            <input
                                type="text"
                                readOnly
                                className="input input-bordered w-full"
                                value={user?.displayName || ''}
                                {...register('touristName')}
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Email</label>
                            <input
                                type="email"
                                readOnly
                                className="input input-bordered w-full"
                                value={user?.email || ''}
                                {...register('email')}
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Profile Photo</label>
                            <input
                                type="text"
                                readOnly
                                className="input input-bordered w-full hidden"
                                value={user?.photoURL || ''}
                                {...register('profilePhoto')}
                            />

                            <div className="avatar">
                                <div className="ring-primary ring-offset-base-100 w-15 rounded-full ring-2 ring-offset-2">
                                    <img src={user?.photoURL || ''} />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Package Name</label>
                            <input
                                type="text"
                                readOnly
                                className="input input-bordered w-full"
                                {...register('packageName')}
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Tour Price</label>
                            <input
                                type="text"
                                readOnly
                                className="input input-bordered w-full"
                                {...register('packagePrice')}
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Select Tour Guide</label>
                            <select
                                className="select select-bordered w-full"
                                {...register('guideName')}
                                onChange={(e) => {
                                    const selectedName = e.target.value;
                                    const selectedGuide = tourGuides.find(guide => guide.name === selectedName);
                                    setValue('guideName', selectedName);
                                    setSelectedGuideEmail(selectedGuide?.email || '');
                                }}
                                required
                            >
                                <option value="" disabled selected>Select a Guide</option>
                                {tourGuides.map((guide, i) => (
                                    <option key={i} value={guide.name}>
                                        {guide.name}
                                    </option>
                                ))}
                            </select>
                        </div>


                        {/* Tour Date */}
                        <div>
                            <label className="block mb-1 font-medium">Tour Date</label>
                            <Controller
                                control={control}
                                name="tourDate"
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <DatePicker
                                        className="input input-bordered w-full"
                                        placeholderText="Select a date"
                                        selected={field.value}
                                        onChange={(date) => field.onChange(date)}
                                        minDate={new Date()}
                                        dateFormat="yyyy-MM-dd"
                                    />
                                )}
                            />
                        </div>

                        <button type="submit" className="btn bg-blue-500 text-white w-full rounded-full hover:bg-blue-800">
                            <MdBookmarkAdded />Confirm Booking
                        </button>
                    </form>
                </div>

                <div className='w-full lg:w-1/2'>
                    <Lottie className="w-[290px] md:w-[400px] lg:w-[500px] mx-auto py-10" animationData={Img} loop={true} ></Lottie>

                    <div className='flex flex-col gap-5 xl:flex-row mb-20 items-center'>

                        <div className=' bg-base-200 p-6 rounded-2xl shadow-2xl max-w-96'>
                            <MdVerified className='text-blue-500' />
                            <h2 className='font-semibold text-md'>Expert Local Guides</h2>
                            <p className='mt-3 text-xs'>Our professional tour guides ensure authentic, safe, and immersive travel experiences tailored just for you.</p>
                        </div>

                        <div className=' bg-base-200 p-6 rounded-2xl shadow-2xl max-w-96'>
                            <MdVerified className='text-blue-500' />
                            <h2 className='font-semibold text-md'>Hassle-Free Booking</h2>
                            <p className='mt-3 text-xs'>From secure payments to instant confirmation, our seamless booking system makes travel stress-free.</p>
                        </div>


                        <div className=' bg-base-200 p-6 rounded-2xl shadow-2xl max-w-96'>
                            <MdVerified className='text-blue-500' />
                            <h2 className='font-semibold text-md'>Handpicked Packages</h2>
                            <p className='mt-3 text-xs'>We curate top-rated destinations with real user feedback to guarantee quality and unforgettable moments.</p>
                        </div>


                    </div>
                </div>
            </div>

        </div>
    );
};

export default BookingForm;