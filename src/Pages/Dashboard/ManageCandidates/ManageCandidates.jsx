import React, { useState } from 'react';
import useAxios from '../../../hooks/useAxios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageCandidates = () => {
    const axiosInstance = useAxios();
    const queryClient = useQueryClient();
    const [selectedApp, setSelectedApp] = useState(null);
    const [page, setPage] = useState(1);
    const limit = 10;

    const axiosSecure = useAxiosSecure();

    const { data, isLoading } = useQuery({
        queryKey: ['tourGuideApplications', page, limit],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tourGuideApplications?page=${page}&limit=${limit}`);
            return res.data;
        }
    });

    const applications = data?.applications || [];
    const totalCount = data?.totalCount || 0;
    const totalPages = Math.ceil(totalCount / limit);

    const acceptMutation = useMutation({
        mutationFn: async ({ email, id, app }) => {
            await axiosSecure.patch('/users/role', { email, role: 'guide' });

            await axiosSecure.post('/tourGuides', {
                name: app.userName,
                email: app.userEmail,
                description: app.description,
                experience: app.experience,
                languages: app.languages,
                rating: 5,
                specialties: app.specialties,
                photoURL: app.photoURL,
                createdAt: new Date().toISOString()
            });

            await axiosSecure.delete(`/tourGuideApplications/${id}`);
        },
        onSuccess: () => {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "User promoted to tour guide and application removed.",
                showConfirmButton: false,
                timer: 1500
            });
            queryClient.invalidateQueries(['tourGuideApplications']);
            setSelectedApp(null);
        },
        onError: () => {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Failed to process acceptance.",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });

    const rejectMutation = useMutation({
        mutationFn: async (id) => {
            await axiosSecure.delete(`/tourGuideApplications/${id}`);
        },
        onSuccess: () => {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Application rejected.",
                showConfirmButton: false,
                timer: 1500
            });
            queryClient.invalidateQueries(['tourGuideApplications']);
        },
        onError: () => {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Failed to reject.",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });

    const handleAccept = (app) => {
        Swal.fire({
            title: `Promote ${app.userName} as Tour Guide?`,
            text: "This will update their role and approve the application.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#16a34a",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, promote",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                acceptMutation.mutate({ email: app.userEmail, id: app._id, app });
            }
        });
    };

    const handleReject = (id) => {
        Swal.fire({
            title: "Reject Application?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, reject",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                rejectMutation.mutate(id);
            }
        });
    };

    return (
        <div className="p-6 mt-10">
            <h2 className="text-4xl font-bold mb-6">Manage Tour Guide Applications</h2>

            {isLoading ? (
                <p>Loading...</p>
            ) : applications.length === 0 ? (
                <p className="text-gray-500">No applications found.</p>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>User Name</th>
                                    <th>Photo</th>
                                    <th>Email</th>
                                    <th>Title</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((app, index) => (
                                    <tr key={app._id}>
                                        <td>{(page - 1) * limit + index + 1}</td>
                                        <td>{app.userName}</td>
                                        <td><img src={app.photoURL} alt="photo" className='w-12 rounded-full' /></td>
                                        <td>{app.userEmail}</td>
                                        <td>{app.title}</td>
                                        <td className="flex flex-wrap gap-2">
                                            <button className="btn btn-sm btn-outline btn-info" onClick={() => setSelectedApp(app)}>View Application</button>
                                            <button className="btn btn-sm bg-green-600 text-white" onClick={() => handleAccept(app)}>Accept</button>
                                            <button className="btn btn-sm bg-red-600 text-white" onClick={() => handleReject(app._id)}>Reject</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="mt-10 flex justify-center gap-4 items-center">
                        <button onClick={() => setPage(prev => Math.max(prev - 1, 1))} className="btn btn-outline" disabled={page === 1}>Previous</button>

                        {[...Array(totalPages).keys()].map(i => (
                            <button
                                key={i}
                                className={`btn ${page === i + 1 ? 'btn-primary' : 'btn-outline'}`}
                                onClick={() => setPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} className="btn btn-outline" disabled={page === totalPages}>Next</button>
                        <p className='text-gray-500 text-sm'>Shows 10 Application Per Page</p>
                    </div>
                </>
            )}

            {/* Modal */}
            {selectedApp && (
                <dialog id="application_modal" className="modal modal-open">
                    <div className="modal-box max-w-2xl">
                        <h3 className="font-bold text-2xl mb-4">Application Details</h3>
                        <div className="space-y-2">
                            <p><strong>Name:</strong> {selectedApp.userName}</p>
                            <p><strong>Email:</strong> {selectedApp.userEmail}</p>
                            <p><strong>Title:</strong> {selectedApp.title}</p>
                            <p><strong>Description:</strong> {selectedApp.description}</p>
                            <p><strong>Reason:</strong> {selectedApp.reason}</p>
                            <p><strong>Experience:</strong> {selectedApp.experience} years</p>
                            <p><strong>Languages:</strong> {selectedApp.languages?.join(', ')}</p>
                            <p><strong>Specialties:</strong> {selectedApp.specialties?.join(', ')}</p>
                            <p>
                                <strong>CV:</strong>{' '}
                                <a href={selectedApp.cvLink} target="_blank" rel="noreferrer" className="text-blue-600 underline">View CV</a>
                            </p>
                        </div>
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn" onClick={() => setSelectedApp(null)}>Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default ManageCandidates;
