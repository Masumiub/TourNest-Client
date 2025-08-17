import React, { useState } from 'react';
import useAxios from '../../../hooks/useAxios';
import useAuth from '../../../hooks/useAuth';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AddStories = () => {

    const { user } = useAuth();
    const axiosInstance = useAxios();
    const [photoInputs, setPhotoInputs] = useState(['']);
    const [uploading, setUploading] = useState(false);
    const axiosSecure = useAxiosSecure();

    // const { data: roleData = {} } = useQuery({
    //     queryKey: ['userRole', user?.email],
    //     queryFn: async () => {
    //         const res = await axiosInstance.get(`/users/role?email=${user.email}`);
    //         return res.data;
    //     },
    //     enabled: !!user?.email
    // });

    // Mutation for story submission
    const mutation = useMutation({
        mutationFn: async (story) => {
            const res = await axiosSecure.post('/stories', story);
            return res.data;
        },
        onSuccess: () => {
            //alert('Story added successfully!');
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Story added successfully!",
                showConfirmButton: false,
                timer: 1500
            });
            reset();
            setPhotoInputs(['']);
        },
        onError: () => {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Failed to add story!",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });

    const { register, handleSubmit, control, reset } = useForm();

    const handleAddPhotoInput = () => {
        setPhotoInputs([...photoInputs, '']);
    };


    const handlePhotoUpload = async (event, index) => {
        const file = event.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await axiosInstance.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgBB_key}`,
                formData
            );
            const newPhotoInputs = [...photoInputs];
            newPhotoInputs[index] = res.data.data.url;
            setPhotoInputs(newPhotoInputs);
        } catch (err) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: `Photo upload failed!${err}`,
                showConfirmButton: false,
                timer: 1500
            });
        } finally {
            setUploading(false);
        }
    };


    const onSubmit = (data) => {
        const newStory = {
            name: data.name,
            tourDate: data.tourDate,
            tourDestination: data.tourDestination,
            description: data.description,
            createdAt: new Date().toISOString(),
            postedBy: user.displayName,
            postedByRole: roleData?.role || 'user',
            postedPhotoURL: user.photoURL,
            tourPhotos: photoInputs.filter(url => url !== ''),
            email: user.email,
            tourDuration: data.tourDuration
        };

        mutation.mutate(newStory);
    };

    return (
        <div className="mx-auto  py-12">
            <h2 className="text-4xl font-bold mb-6 px-6">Share Your Travel Story</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 shadow-md p-8 rounded-xl">

                <div>
                    <label className="label">Story Title</label>
                    <input
                        {...register('name', { required: true })}
                        className="input input-bordered w-full"
                        placeholder="A Day in Bandarban"
                    />
                </div>

                <div>
                    <label className="label">Tour Date</label> <br />
                    <Controller
                        control={control}
                        name="tourDate"
                        className="w-full"
                        rules={{ required: true }}
                        render={({ field }) => (
                            <DatePicker
                                selected={field.value}
                                onChange={(date) => field.onChange(date)}
                                className="input input-bordered w-full"
                                placeholderText="Select Tour Date"
                            />
                        )}
                    />
                </div>

                <div>
                    <label className="label">Tour Destination</label>
                    <input
                        {...register('tourDestination', { required: true })}
                        className="input input-bordered w-full"
                        placeholder="Enter destination name"
                    />
                </div>

                <div>
                    <label className="label">Tour Duration (in days)</label>
                    <input
                        type="number"
                        {...register('tourDuration', { required: true, min: 1 })}
                        className="input input-bordered w-full"
                        placeholder="e.g., 3"
                    />
                </div>

                <div>
                    <label className="label">Story Description (Minimum 250 characters)</label>
                    <textarea
                        {...register('description', { required: true, minLength: 250 })}
                        className="textarea textarea-bordered w-full"
                        rows={6}
                        placeholder="Write a detailed story (min 250 words)"
                    ></textarea>
                </div>

                <div>
                    <label className="label">Tour Photos</label>
                    {photoInputs.map((photo, index) => (
                        <div key={index} className="flex items-center gap-4 mb-3">
                            <input
                                type="file"
                                className="file-input file-input-bordered"
                                onChange={(e) => handlePhotoUpload(e, index)}
                            />
                            {photo && <img src={photo} alt="Uploaded" className="w-16 h-16 rounded-lg object-cover" />}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddPhotoInput}
                        className="btn btn-outline btn-sm mt-2"
                    >
                        + Add Photo
                    </button>
                </div>

                <div className="flex">
                    <button
                        disabled={uploading}
                        type="submit"
                        className="btn bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-800"
                    >
                        {uploading ? 'Uploading...' : 'Submit Story'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddStories;