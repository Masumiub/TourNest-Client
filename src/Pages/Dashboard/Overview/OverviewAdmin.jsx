import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import useUserRole from '../../../hooks/useUserRole';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

// chart imports
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { useQuery } from '@tanstack/react-query';

// register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OverviewAdmin = () => {

    const { user, setUser } = useAuth();
    const axiosInstance = useAxios();

    const axiosSecure = useAxiosSecure();
    const { role, roleLoading } = useUserRole();

    // fetch admin stats
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

    // fetch all payments for chart
    const { data: payments = [] } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosInstance.get('/payments');
            return res.data; // expect [{email, amount}, ...]
        },
        enabled: role === 'admin',
    });


    // prepare chart data
    const chartData = {
        labels: payments.map(p => p.email),
        datasets: [
            {
                label: 'Payment Amount',
                data: payments.map(p => p.amount),
                backgroundColor: 'rgba(37, 99, 235, 0.6)',
                borderColor: 'rgba(37, 99, 235, 1)',
                borderWidth: 1,
            }
        ]
    };


    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Payments by User' },
        },
    };

    //console.log(payments)

    return (
        <div className='p-6'>
            <h3 className="text-4xl font-semibold mb-4 mt-10">Overview</h3>
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

                    </div>
                )}

            </div>


            {/* Payment Chart */}
            <div className="mt-12 bg-base-100 shadow-md p-6 rounded-xl">
                <h3 className="text-2xl font-semibold mb-4">Payments Overview</h3>
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default OverviewAdmin;