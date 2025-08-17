import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2'


const AddPackage = () => {

    const { user } = useAuth();
    const axiosInstance = useAxios();
    const [photos, setPhotos] = useState([]);
    const [bannerURL, setBannerURL] = useState('');
    const [tourDate, setTourDate] = useState(new Date());

    const { register, handleSubmit, reset, setValue } = useForm();

    const axiosSecure = useAxiosSecure()

    const imgbbKey = import.meta.env.VITE_imgBB_key;

    const uploadImage = async (imageFile) => {
        const formData = new FormData();
        formData.append('image', imageFile);
        const res = await axiosInstance.post(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, formData);
        return res.data.data.url;
    };

    const handleAddPhoto = async (e) => {
        const imageFile = e.target.files[0];
        if (imageFile) {
            const url = await uploadImage(imageFile);
            setPhotos(prev => [...prev, url]);
        }
    };

    const handleBannerUpload = async (e) => {
        const imageFile = e.target.files[0];
        if (imageFile) {
            const url = await uploadImage(imageFile);
            setBannerURL(url);
        }
    };

    const mutation = useMutation({
        mutationFn: async (data) => {
            const packageData = {
                ...data,
                banner: bannerURL,
                photos,
                tourDate,
                price: parseFloat(data.price),
                groupSize: parseInt(data.groupSize),
                days: data.days.split('\n').filter(Boolean),
                createdBy: user.email,
                createdAt: new Date().toISOString()
            };
            const res = await axiosSecure.post('/packages', packageData);
            return res.data;
        },
        onSuccess: () => {
            //alert('Package added successfully');
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Package added successfully",
                showConfirmButton: false,
                timer: 1500
            });
            reset();
            setBannerURL('');
            setPhotos([]);
        },
        onError: () => {
            //alert('Failed to add package');
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Failed to add package!",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });

    const onSubmit = (data) => {
        if (!bannerURL || photos.length === 0) {
            //alert('Please upload a banner and at least one tour photo.');
            Swal.fire({
                position: "center",
                icon: "info",
                title: "Please upload a banner and at least one tour photo.",
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }
        mutation.mutate(data);
    };


    return (
        <div className=" mx-auto p-6 shadow-lg rounded-lg mt-10">
            <h2 className="text-4xl font-bold mb-6">Add New Tour Package</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Title */}
                <div>
                    <label className="block mb-1 ">Trip Title</label>
                    <input type="text" {...register('title', { required: true })} className="input input-bordered w-full" />
                </div>

                {/* Banner Upload */}
                <div>
                    <label className="block mb-1 ">Upload Banner Image</label>
                    <input type="file" accept="image/*" onChange={handleBannerUpload} className="file-input file-input-bordered w-full" />
                </div>

                {/* Add More Photos */}
                <div>
                    <label className="block mb-1 ">Upload Tour Photos</label>
                    <input type="file" accept="image/*" onChange={handleAddPhoto} className="file-input file-input-bordered w-full" />
                    <div className="mt-2 text-sm text-gray-500">+Add more photos one by one</div>
                    <div className="flex gap-2 mt-2 flex-wrap">
                        {photos.map((photo, i) => (
                            <img key={i} src={photo} alt="Uploaded" className="w-20 h-20 object-cover rounded-md" />
                        ))}
                    </div>
                </div>

                {/* Tour Type */}
                <div>
                    <label className="block mb-1 ">Tour Type</label>
                    <input type="text" {...register('tourType', { required: true })} className="input input-bordered w-full" />
                </div>

                {/* Price */}
                <div>
                    <label className="block mb-1 ">Price (BDT)</label>
                    <input type="number" {...register('price', { required: true })} className="input input-bordered w-full" />
                </div>

                {/* Duration */}
                <div>
                    <label className="block mb-1 ">Duration</label>
                    <input type="text" {...register('duration', { required: true })} placeholder="e.g., 3 Days 2 Nights" className="input input-bordered w-full" />
                </div>

                {/* Group Size */}
                <div>
                    <label className="block mb-1 ">Group Size</label>
                    <input type="number" {...register('groupSize', { required: true })} className="input input-bordered w-full" />
                </div>

                {/* Location */}
                <div>
                    <label className="block mb-1 ">Location</label>
                    <input type="text" {...register('location', { required: true })} className="input input-bordered w-full" />
                </div>

                <div>
                    <label className="block mb-1 ">Rating</label>
                    <input type="number" {...register('rating', { required: true })} className="input input-bordered w-full" />
                </div>

                {/* Tour Date */}
                <div>
                    <label className="block mb-1 ">Tour Start Date</label>
                    <DatePicker
                        selected={tourDate}
                        onChange={(date) => setTourDate(date)}
                        className="input input-bordered w-full"
                        dateFormat="yyyy-MM-dd"
                    />
                </div>

                {/* Tour Plan */}
                <div>
                    <label className="block mb-1 ">Tour Plan</label>
                    <textarea {...register('tourPlan', { required: true })} className="textarea textarea-bordered w-full"></textarea>
                </div>

                {/* Days Plan */}
                <div>
                    <label className="block mb-1 ">Day-wise Plan</label>
                    <textarea {...register('days', { required: true })} placeholder="Day 1: Travel to...\nDay 2: Explore..." className="textarea textarea-bordered w-full" />
                </div>

                {/* Description */}
                <div>
                    <label className="block mb-1 ">Description</label>
                    <textarea {...register('description', { required: true })} className="textarea textarea-bordered w-full" rows="5" />
                </div>

                {/* Submit */}
                <div>
                    <button type="submit" className="btn bg-blue-500 text-white rounded-full btn-lg">Add Package</button>
                </div>
            </form>
        </div>
    );
};

export default AddPackage;