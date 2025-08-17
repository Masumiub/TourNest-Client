import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { MdOutlinePayment, MdOutlineCancel } from "react-icons/md";
import Loading from '../../../Components/Loading'


const MyBookings = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10); 

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['bookings', user?.email, page, limit],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings?email=${user.email}&page=${page}&limit=${limit}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const bookings = data?.bookings || [];
    const totalCount = data?.totalCount || 0;
    const totalPages = Math.ceil(totalCount / limit);

    const handleCancel = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this cancellation!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        });

        if (result.isConfirmed) {
            try {
                await axiosSecure.delete(`/bookings/${id}`);
                refetch();
                Swal.fire({
                    title: "Cancelled!",
                    text: "Your booking has been cancelled.",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                });
            } catch (err) {
                Swal.fire({
                    title: "Failed!",
                    text: "Failed to cancel the booking.",
                    icon: "error",
                    timer: 1500,
                    showConfirmButton: false,
                });
            }
        }
    };

    if (isLoading) return <Loading></Loading>;

    return (
        <div className='px-6 mt-12'>
            <h2 className='text-4xl font-bold mb-6'>My Bookings</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className='bg-base-200'>
                        <tr>
                            <th>#</th>
                            <th>Package</th>
                            <th>Tour Guide</th>
                            <th>Tour Date</th>
                            <th>Price (BDT)</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length === 0 ? (
                            <tr><td colSpan="7" className='text-center'>You don't have any Booking!</td></tr>
                        ) : (
                            bookings.map((booking, index) => (
                                <tr key={booking._id}>
                                    <td>{(page - 1) * limit + index + 1}</td>
                                    <td>{booking.packageName}</td>
                                    <td>{booking.guideName}</td>
                                    <td>{new Date(booking.tourDate).toLocaleDateString()}</td>
                                    <td>{booking.price}</td>
                                    <td>{booking.status}</td>
                                    <td className='space-x-2'>
                                        {booking.status === 'pending' && (
                                            <>
                                                <Link to={`/dashboard/payment/${booking._id}`} className='btn btn-sm bg-green-500 text-white'>
                                                    <MdOutlinePayment /> Pay
                                                </Link>
                                                <button
                                                    onClick={() => handleCancel(booking._id)}
                                                    className='btn btn-sm bg-red-500 text-white'
                                                >
                                                    <MdOutlineCancel /> Cancel
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination UI */}
            
                <div className="flex items-center justify-center gap-4 mt-8">
                    <button
                        className="btn btn-outline"
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                    >
                        Previous
                    </button>
                    {[...Array(totalPages)].map((_, idx) => (
                        <button
                            key={idx}
                            className={`btn ${page === idx + 1 ? 'btn-active btn-primary' : 'btn-outline'}`}
                            onClick={() => setPage(idx + 1)}
                        >
                            {idx + 1}
                        </button>
                    ))}
                    <button
                        className="btn btn-outline"
                        onClick={() => setPage(page + 1)}
                        disabled={page === totalPages}
                    >
                        Next
                    </button>
                </div>
            
        </div>
    );
};

export default MyBookings;
