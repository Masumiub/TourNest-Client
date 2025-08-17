import React from 'react';
import useAxios from '../../../hooks/useAxios';
import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const JoinAsTourGuide = () => {
    const { register, handleSubmit, reset } = useForm();
   // const axiosInstance = useAxios();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const mutation = useMutation({
        mutationFn: async (applicationData) => {
            const res = await axiosSecure.post('/tourGuideApplications', applicationData);
            return res.data;
        },
        onSuccess: () => {
            //alert('Application submitted successfully!');
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Application submitted successfully!",
                showConfirmButton: false,
                timer: 1500
            });
            reset();
        },
        onError: () => {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Failed to submit the application!",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });

    const onSubmit = (data) => {
        const application = {
            title: data.title,
            description: data.description,
            experience: parseInt(data.experience),
            languages: data.languages.split(',').map(lang => lang.trim()).filter(Boolean),
            specialties: data.specialties.split(',').map(item => item.trim()).filter(Boolean),
            reason: data.reason,
            cvLink: data.cvLink,
            userName: user.displayName,
            userEmail: user.email,
            photoURL: user.photoURL,
            posted_at: new Date().toISOString()
        };
        mutation.mutate(application);
    };

    return (
        <div className="mx-auto py-12">
            <h2 className="text-4xl font-bold mb-6 px-6">Apply to Become a Tour Guide</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 shadow-md rounded-xl p-8">

                {/* Title */}
                <div>
                    <label className="label">Application Title</label>
                    <input
                        type="text"
                        {...register('title', { required: true })}
                        className="input input-bordered w-full"
                        placeholder="Enter a title for your application"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="label">About You</label>
                    <textarea
                        {...register('description', { required: true })}
                        className="textarea textarea-bordered w-full"
                        placeholder="Briefly describe yourself and your background"
                        rows="4"
                    />
                </div>

                {/* Experience */}
                <div>
                    <label className="label">Years of Experience</label>
                    <input
                        type="number"
                        min={0}
                        {...register('experience', { required: true })}
                        className="input input-bordered w-full"
                        placeholder="e.g. 3"
                    />
                </div>

                {/* Languages */}
                <div>
                    <label className="label">Languages Spoken (comma-separated)</label>
                    <input
                        type="text"
                        {...register('languages', { required: true })}
                        className="input input-bordered w-full"
                        placeholder="e.g. English, Bengali, Hindi"
                    />
                </div>

                {/* Specialties */}
                <div>
                    <label className="label">Tour Specialties (comma-separated)</label>
                    <input
                        type="text"
                        {...register('specialties', { required: true })}
                        className="input input-bordered w-full"
                        placeholder="e.g. Historical, Adventure, Nature"
                    />
                </div>

                {/* Reason */}
                <div>
                    <label className="label">Why do you want to be a tour guide?</label>
                    <textarea
                        {...register('reason', { required: true })}
                        className="textarea textarea-bordered w-full"
                        rows="5"
                        placeholder="Explain your motivation and qualifications"
                    />
                </div>

                {/* CV Link */}
                <div>
                    <label className="label">CV / Portfolio Link</label>
                    <input
                        type="url"
                        {...register('cvLink', { required: true })}
                        className="input input-bordered w-full"
                        placeholder="https://your-portfolio.com"
                    />
                </div>


                {/* Photo */}
                <div>
                    <label className="label">Your Photo</label>
                    <img src={user.photoURL} alt="photourl" className='w-15 rounded-full' />
                    <input
                        type="url" value={user.photoURL}
                        {...register('photoURL', { required: true })}
                        className="input input-bordered w-full hidden"
                    />
                </div>


                {/* Submit */}
                <div className="">
                    <button
                        type="submit"
                        className="btn bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-800"
                    >
                        Submit Application
                    </button>
                </div>
            </form>
        </div>
    );
};

export default JoinAsTourGuide;
