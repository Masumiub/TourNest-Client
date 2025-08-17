import React from 'react';
import useAxios from '../../../hooks/useAxios';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { MdDeleteOutline } from "react-icons/md";
import { RiEdit2Line } from "react-icons/ri";
import Loading from '../../../Components/Loading';

const ManageStories = () => {
    const axiosInstance = useAxios();
    const axiosSecure = useAxiosSecure();


    const { user } = useAuth();

    const { data: stories = [], refetch, isLoading } = useQuery({
        queryKey: ['userStories', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/stories/user?email=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to recover this story!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            try {
                await axiosSecure.delete(`/stories/${id}`);
                refetch();
                Swal.fire({
                    title: "Deleted!",
                    text: "Your story has been deleted.",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                });
            } catch (error) {
                console.error(error);
                Swal.fire({
                    title: "Failed!",
                    text: "Failed to delete the story.",
                    icon: "error",
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        }
    };
    if (isLoading) return <Loading></Loading>;

    return (
        <div>
            <div className="mt-10">
                <h2 className="text-4xl font-bold mb-8 px-6">My Tour Stories</h2>

                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                    {
                        stories.length == 0 ? <p className='ml-6'>No stories found!</p> :
                            stories.map(story => (
                                <div key={story._id} className="flex shadow-md rounded-xl p-6 gap-4 items-stretch">
                                    <div className="w-1/3">
                                        {story.tourPhotos?.[0] ? (
                                            <img
                                                src={story.tourPhotos[0]}
                                                alt="Tour banner"
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        ) : (
                                            <p className="text-gray-400 italic">No image</p>
                                        )}
                                    </div>
                                    <div className="w-2/3 flex flex-col justify-between">
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
                                            <p className="mb-4"><strong>Duration:</strong> {story.tourDuration} days</p>
                                            <p className="line-clamp-4">{story.description}</p>
                                        </div>
                                        <div className="mt-4 flex gap-3">
                                            <Link
                                                to={`/dashboard/updateStory/${story._id}`}
                                                className="btn btn-sm btn-outline btn-info  rounded-full"
                                            >
                                               <RiEdit2Line /> Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(story._id)}
                                                className="btn btn-sm bg-red-500 text-white rounded-full"
                                            >
                                              <MdDeleteOutline />  Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                </div>
            </div>
        </div>
    );
};

export default ManageStories;