import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { IoMdCreate } from 'react-icons/io';
import useUserRole from '../../../hooks/useUserRole';

const ManageProfileAdmin = () => {

    const { user , setUser, updateUserProfile, loading} = useAuth();
    const axiosInstance = useAxios();
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', photoURL: '' });

    const axiosSecure = useAxiosSecure()

    const { role, roleLoading } = useUserRole();

    const { data: stats = {}, isLoading: statsLoading } = useQuery({
        queryKey: ['adminStats'],
        queryFn: async () => {
            const [paymentsRes, guidesRes, packagesRes, usersRes, storiesRes] = await Promise.all([
                axiosSecure.get('/payments/sum'),
                axiosSecure.get('/tourGuides/count'),
                axiosSecure.get('/packages/count'),
                axiosSecure.get('/users/count?role=user'),
                axiosSecure.get('/stories/count'),
            ]);
            return {
                totalPayment: paymentsRes.data.total,
                totalGuides: guidesRes.data.count,
                totalPackages: packagesRes.data.count,
                totalUsers: usersRes.data.count,
                totalStories: storiesRes.data.count,
            };
        },
        enabled: role === 'admin',
    });

    //console.log(stats.totalPayment)


    const updateProfileMutation = useMutation({
        mutationFn: async (updatedData) => {
            const res = await axiosSecure.patch('/users/update', updatedData);
            return res.data;
        },
        onSuccess: async (_data, updatedData) => {
            try {
                await updateUserProfile({
                    displayName: updatedData.name,
                    photoURL: updatedData.photoURL,
                });

                setUser({
                    ...user,
                    displayName: updatedData.name,
                    photoURL: updatedData.photoURL,
                });

                queryClient.invalidateQueries(['userRole']);
                setIsModalOpen(false);
            } catch (error) {
                console.error("Auth profile update failed:", error);
            }
        }
    });

    const handleEditClick = () => {
        setFormData({
            name: user.displayName || '',
            photoURL: user.photoURL || ''
        });
        setIsModalOpen(true);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        updateProfileMutation.mutate({
            email: user.email,
            name: formData.name,
            photoURL: formData.photoURL
        });
    };



    return (
        <div className="mx-auto p-6 mt-10">
            <h2 className="text-4xl font-bold mb-6">Welcome, {user.displayName} 👋</h2>

            <div className=" shadow-md rounded-lg p-6 flex flex-col md:flex-row gap-6 items-center">
                <img src={user.photoURL} alt="Profile" className="w-32 h-32 rounded-full object-cover border-2 border-blue-500" />
                <div className="flex-1 space-y-2">
                    <p><strong>Name:</strong> {user.displayName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {role}</p>

                    <div className="flex gap-4 mt-4">
                        <button onClick={handleEditClick} className="btn btn-sm btn-outline rounded-full flex items-center gap-2">
                            <IoMdCreate /> Edit Profile
                        </button>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
                    <div className="bg-base-200 p-6 rounded-lg w-96 relative">
                        <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Photo URL</label>
                                <input
                                    type="text"
                                    value={formData.photoURL}
                                    onChange={(e) => setFormData({ ...formData, photoURL: e.target.value })}
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div className="flex justify-between mt-6">
                                <button type="submit" className="btn btn-primary">Save Changes</button>
                                <button type="button" onClick={() => setIsModalOpen(false)} className="btn">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className='mt-10'>
                {!statsLoading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                        <div className="stat shadow-md bg-base-100 p-4 rounded-xl">

                            <div className='flex gap-3 items-center'>
                                <div>
                                    <img width="80" height="80" src="https://img.icons8.com/color/100/card-in-use.png" alt="card-in-use" />
                                </div>

                                <div>
                                    <div className="stat-title">Total Payment</div>
                                    <div className="stat-value text-blue-500">৳ {stats.totalPayment}</div>
                                </div>
                            </div>
                        </div>
                        <div className="stat shadow-md bg-base-100 p-4 rounded-xl">

                            <div className='flex gap-3 items-center'>
                                <div>
                                    <img width="70" height="70" src="https://img.icons8.com/color/100/tour-guide.png" alt="tour-guide" />
                                </div>
                                <div>
                                    <div className="stat-title">Tour Guides</div>
                                    <div className="stat-value">{stats.totalGuides}</div>
                                </div>
                            </div>
                        </div>
                        <div className="stat shadow-md bg-base-100 p-4 rounded-xl">

                            <div className='flex gap-3 items-center'>
                                <div>
                                    <img width="54" height="54" src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-tour-prehistoric-flaticons-flat-flat-icons.png" alt="external-tour-prehistoric-flaticons-flat-flat-icons" />
                                </div>

                                <div>
                                    <div className="stat-title">Packages</div>
                                    <div className="stat-value">{stats.totalPackages}</div>
                                </div>

                            </div>

                        </div>
                        <div className="stat shadow-md bg-base-100 p-4 rounded-xl">
                            <div className='flex gap-3 items-center'>
                            <div>
                            <img width="50" height="50" src="https://img.icons8.com/external-flat-deni-mao/50/external-Tour-Guide-travel-and-vacation-flat-deni-mao.png" alt="external-Tour-Guide-travel-and-vacation-flat-deni-mao" />
                            </div>
                            <div>
                            <div className="stat-title">Clients</div>
                            <div className="stat-value">{stats.totalUsers}</div>
                            </div>
                            </div>
                        </div>
                        <div className="stat shadow-md bg-base-100 p-4 rounded-xl">

                            <div className='flex gap-3 items-center'>
                            <img width="70" height="70" src="https://img.icons8.com/keek/100/open-book.png" alt="open-book" />
                            <div>
                            <div className="stat-title">Stories</div>
                            <div className="stat-value">{stats.totalStories}</div>
                            </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>

        </div>
    );
};

export default ManageProfileAdmin;