import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { IoMdCreate } from 'react-icons/io';
import { Link } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import ManageProfileGuide from './ManageProfileGuide';
import ManageProfileAdmin from './ManageProfileAdmin';

const ManageProfile = () => {
    const { user, setUser, updateUserProfile, loading } = useAuth();
    const axiosInstance = useAxios();
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', photoURL: '' });


    const axiosSecure = useAxiosSecure()


    const { data: roleData, isLoading } = useQuery({
        queryKey: ['userRole', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role?email=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });


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

    if (roleData?.role == 'guide') {
        return <ManageProfileGuide></ManageProfileGuide>
    }

    if (roleData?.role == 'admin') {
        return <ManageProfileAdmin></ManageProfileAdmin>
    }


    return (
        <div className="mx-auto p-6 mt-10">
            <h2 className="text-4xl font-bold mb-6">Welcome, {user.displayName} 👋</h2>

            <div className=" shadow-md rounded-lg p-6 flex flex-col md:flex-row gap-6 items-center">
                <img src={user.photoURL} alt="Profile" className="w-32 h-32 rounded-full object-cover border-2 border-blue-500" />
                <div className="flex-1 space-y-2">
                    <p><strong>Name:</strong> {user.displayName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {isLoading ? 'Loading...' : roleData?.role || 'User'}</p>

                    <div className="flex gap-4 mt-4">
                        <button onClick={handleEditClick} className="btn btn-sm btn-outline rounded-full flex items-center gap-2">
                            <IoMdCreate /> Edit Profile
                        </button>
                        <Link to="/dashboard/joinAsTourGuide" className="btn btn-sm bg-blue-500 text-white rounded-full">
                            Apply for Tour Guide
                        </Link>
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
        </div>
    );
};

export default ManageProfile;