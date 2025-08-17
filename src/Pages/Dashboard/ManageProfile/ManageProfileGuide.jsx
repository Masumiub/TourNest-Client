import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { IoMdCreate } from 'react-icons/io';
import { Link } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageProfileGuide = () => {
    const { user, setUser, updateUserProfile, loading } = useAuth();
    const axiosInstance = useAxios();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', photoURL: '' });
    const [guideData, setGuideData] = useState({
        description: '',
        experience: '',
        languages: '',
        specialties: ''
    });

    const { data: tourGuideData, isLoading: guideLoading } = useQuery({
        queryKey: ['tourGuideProfile', user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/tourGuides/email/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    useEffect(() => {
        if (tourGuideData) {
            setGuideData({
                description: tourGuideData.description || '',
                experience: tourGuideData.experience || '',
                languages: tourGuideData.languages?.join(', ') || '',
                specialties: tourGuideData.specialties?.join(', ') || '',
            });
        }
    }, [tourGuideData]);

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
        }
    });

    const updateGuideMutation = useMutation({
        mutationFn: async (updatedGuide) => {
            const res = await axiosSecure.patch(`/tourGuides/${tourGuideData._id}`, {
                description: updatedGuide.description,
                experience: updatedGuide.experience,
                languages: updatedGuide.languages.split(',').map(l => l.trim()),
                specialties: updatedGuide.specialties.split(',').map(s => s.trim()),
            });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['tourGuideProfile']);
            setIsGuideModalOpen(false);
        }
    });

    const handleEditClick = () => {
        setFormData({
            name: user.displayName || '',
            photoURL: user.photoURL || ''
        });
        setIsModalOpen(true);
    };

    const handleGuideEditClick = () => {
        setIsGuideModalOpen(true);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        updateProfileMutation.mutate({
            email: user.email,
            name: formData.name,
            photoURL: formData.photoURL
        });
    };

    const handleGuideFormSubmit = (e) => {
        e.preventDefault();
        updateGuideMutation.mutate(guideData);
    };

    return (
        <div className="mx-auto p-6 mt-10">
            <h2 className="text-4xl font-bold mb-6">Welcome, {user.displayName} 👋</h2>

            <div className="shadow-md rounded-lg p-6 flex flex-col md:flex-row gap-6 items-center">
                <img src={user.photoURL} alt="Profile" className="w-32 h-32 rounded-full object-cover border-2 border-blue-500" />
                <div className="flex-1 space-y-2">
                    <p><strong>Name:</strong> {user.displayName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {isLoading ? 'Loading...' : roleData?.role || 'User'}</p>
                    <button onClick={handleEditClick} className="btn btn-sm btn-outline rounded-full mt-4 flex items-center gap-2">
                        <IoMdCreate /> Edit Profile
                    </button>
                </div>
            </div>

            {/* Profile Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
                    <div className="bg-base-200 p-6 rounded-lg w-96 relative">
                        <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="input input-bordered w-full"
                            />
                            <input
                                type="text"
                                placeholder="Photo URL"
                                value={formData.photoURL}
                                onChange={(e) => setFormData({ ...formData, photoURL: e.target.value })}
                                className="input input-bordered w-full"
                            />
                            <div className="flex justify-between mt-6">
                                <button type="submit" className="btn btn-primary">Save</button>
                                <button onClick={() => setIsModalOpen(false)} className="btn">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Tour Guide Info */}
            <div className='px-6 py-6'>
                <h1 className='font-semibold'>Description</h1>
                <p className='mt-2'>{tourGuideData?.description}</p>

                <h1 className='font-semibold mt-5'>Experiences</h1>
                <p className='mt-2'>{tourGuideData?.experience} Year Experience</p>

                <h1 className='font-semibold mt-5'>Languages</h1>
                <ul className='mt-2'>
                    {tourGuideData?.languages?.map((lang, idx) => <li key={idx}>- {lang}</li>)}
                </ul>

                <h1 className='font-semibold mt-5'>Specialties</h1>
                <ul className='mt-2'>
                    {tourGuideData?.specialties?.map((sp, idx) => <li key={idx}>- {sp}</li>)}
                </ul>

                <button onClick={handleGuideEditClick} className='btn btn-outline mt-8 rounded-full'>Edit Guide Details</button>
            </div>

            {/* Guide Details Edit Modal */}
            {isGuideModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
                    <div className="bg-base-200 p-6 rounded-lg w-96 relative">
                        <h3 className="text-xl font-semibold mb-4">Edit Guide Details</h3>
                        <form onSubmit={handleGuideFormSubmit} className="space-y-4">
                            <textarea
                                placeholder="Description"
                                className="textarea textarea-bordered w-full"
                                value={guideData.description}
                                onChange={(e) => setGuideData({ ...guideData, description: e.target.value })}
                            />
                            <input
                                type="number"
                                placeholder="Experience (years)"
                                className="input input-bordered w-full"
                                value={guideData.experience}
                                onChange={(e) => setGuideData({ ...guideData, experience: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Languages (comma separated)"
                                className="input input-bordered w-full"
                                value={guideData.languages}
                                onChange={(e) => setGuideData({ ...guideData, languages: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Specialties (comma separated)"
                                className="input input-bordered w-full"
                                value={guideData.specialties}
                                onChange={(e) => setGuideData({ ...guideData, specialties: e.target.value })}
                            />
                            <div className="flex justify-between mt-6">
                                <button type="submit" className="btn btn-primary">Save Changes</button>
                                <button onClick={() => setIsGuideModalOpen(false)} className="btn">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageProfileGuide;
