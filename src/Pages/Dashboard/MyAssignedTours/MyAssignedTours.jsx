import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery, useMutation } from '@tanstack/react-query';
import Loading from '../../../Components/Loading';

const MyAssignedTours = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [page, setPage] = useState(1);
    const [limit] = useState(10); // You can make this selectable

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['assignedTours', user?.email, page, limit],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/assigned?email=${user.email}&page=${page}&limit=${limit}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    const bookings = data?.bookings || [];
    const totalCount = data?.totalCount || 0;
    const totalPages = Math.ceil(totalCount / limit);

    const mutation = useMutation({
        mutationFn: async ({ id, status }) => {
            await axiosSecure.patch(`/bookings/status/${id}`, { status });
        },
        onSuccess: () => {
            refetch();
        }
    });

    const handleAccept = (id) => {
        mutation.mutate({ id, status: 'accepted' });
    };

    const handleReject = (id) => {
        const confirm = window.confirm('Are you sure you want to reject this tour?');
        if (confirm) {
            mutation.mutate({ id, status: 'rejected' });
        }
    };

    if (isLoading) return <Loading></Loading>;

    return (
        <div className="px-6 mt-10">
            <h2 className="text-4xl font-bold mb-6">My Assigned Tours</h2>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className="bg-base-200">
                        <tr>
                            <th>Package Name</th>
                            <th>Tourist</th>
                            <th>Tour Date</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(booking => (
                            <tr key={booking._id}>
                                <td>{booking.packageName}</td>
                                <td>{booking.touristName}</td>
                                <td>{new Date(booking.tourDate).toDateString()}</td>
                                <td>৳{booking.price}</td>
                                <td className="capitalize">{booking.status}</td>
                                <td className="flex gap-2">
                                    <button
                                        disabled={booking.status !== 'in review'}
                                        onClick={() => handleAccept(booking._id)}
                                        className={`btn btn-sm text-white ${booking.status === 'in review' ? 'bg-green-500' : 'bg-gray-400'}`}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        disabled={booking.status !== 'in review'}
                                        onClick={() => handleReject(booking._id)}
                                        className="btn btn-sm bg-red-500 text-white"
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {bookings.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center py-8 text-gray-500">No assigned tours found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="mt-10 flex justify-center gap-4 items-center">
                <button
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    className="btn btn-outline"
                    disabled={page === 1}
                >
                    Previous
                </button>

                {[...Array(totalPages).keys()].map(i => (
                    <button
                        key={i}
                        className={`btn ${page === i + 1 ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => setPage(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                    className="btn btn-outline"
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default MyAssignedTours;
