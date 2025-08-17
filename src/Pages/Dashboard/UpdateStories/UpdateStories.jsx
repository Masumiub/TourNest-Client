import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router';
import DatePicker from 'react-datepicker';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import Loading from '../../../Components/Loading';

const UpdateStories = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const axiosInstance = useAxios();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [newPhotos, setNewPhotos] = useState([]);
    const { register, handleSubmit, control, setValue } = useForm();

    
    const { data: story, isLoading } = useQuery({
        queryKey: ['story', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/stories/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    useEffect(() => {
        if (story) {
            setValue('name', story.name);
            setValue('tourDestination', story.tourDestination);
            setValue('description', story.description);
            setValue('tourDuration', story.tourDuration);
            setValue('tourDate', new Date(story.tourDate));
        }
    }, [story, setValue]);

    const mutation = useMutation({
        mutationFn: async (updatedData) => {
            return await axiosSecure.patch(`/stories/${id}`, updatedData);
        },
        onSuccess: () => {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Story updated!",
                showConfirmButton: false,
                timer: 1500
            });
            queryClient.invalidateQueries(['userStories']);
            navigate('/dashboard/manageStories');
        },
        onError: () => {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Story update Failed!",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });

    const onSubmit = async (data) => {
        const photoURLs = [];

        for (const image of newPhotos) {
            const formData = new FormData();
            formData.append('image', image);
            const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgBB_key}`;
            const res = await axiosInstance.post(url, formData);
            photoURLs.push(res.data.data.url);
        }

        for (const url of photoURLs) {
            await axiosInstance.patch(`/stories/add-photo/${id}`, { photoURL: url });
        }

        mutation.mutate({ ...data, tourDate: data.tourDate.toISOString() });
    };

    const handleRemovePhoto = async (photoURL) => {
        try {
            await axiosInstance.patch(`/stories/remove-photo/${id}`, { photoURL });
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Photo removed!",
                showConfirmButton: false,
                timer: 1500
            });
            queryClient.invalidateQueries(['story', id]);
        } catch (err) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Error removing photo!",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    if (isLoading) return <Loading></Loading>;

    if (user?.email !== story?.email) {
        return <p className="text-center text-red-500">Access denied. You can only edit your own story.</p>;
    }

    return (
        <div className="mx-auto p-6">
            <h2 className="text-4xl font-bold mb-6 mt-10">Update Your Story</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <label className="block font-semibold">Story Title</label>
                <input {...register('name')} className="input input-bordered w-full" />

                <label className="block font-semibold">Destination</label>
                <input {...register('tourDestination')} className="input input-bordered w-full" />

                <label className="block font-semibold">Description</label>
                <textarea {...register('description')} rows="6" className="textarea textarea-bordered w-full" />

                <label className="block font-semibold">Duration (days)</label>
                <input {...register('tourDuration')} type="number" className="input input-bordered w-full" />

                <label className="block font-semibold">Tour Date</label>
                <Controller
                    name="tourDate"
                    control={control}
                    render={({ field }) => (
                        <DatePicker
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            className="input input-bordered w-full"
                        />
                    )}
                />

                <div className="mt-10">
                    <h3 className="text-xl font-bold mb-2">Tour Photos</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {story.tourPhotos.map((photo, index) => (
                            <div key={index} className="relative">
                                <img src={photo} alt="tour" className="w-full h-40 object-cover rounded-lg" />
                                <button
                                    onClick={() => handleRemovePhoto(photo)}
                                    className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full text-xs"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 space-y-2">
                        <label className="block font-semibold">Upload New Photo(s)</label>
                        <input
                            type="file"
                            multiple
                            onChange={(e) => setNewPhotos([...e.target.files])}
                            className="file-input file-input-bordered w-full"
                        />
                    </div>
                </div>

                <button type="submit" className="btn bg-blue-600 text-white rounded-full mt-8">Update Story</button>
            </form>
        </div>
    );
};

export default UpdateStories;
