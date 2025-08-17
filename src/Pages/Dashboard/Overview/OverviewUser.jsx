import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OverviewUser = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axiosSecure.get(
                    `/bookings?email=${user.email}&page=1&limit=50`
                );
                setBookings(res.data.bookings || []);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };
        if (user?.email) fetchBookings();
    }, [user, axiosSecure]);

    const data = {
        labels: bookings.map((b) => b.packageName), // X-axis → package name
        datasets: [
            {
                label: "Tour Price (৳)",
                data: bookings.map((b) => b.price), // Y-axis → price
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "My Bookings - Price per Package",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value) => `৳${value}`,
                },
            },
        },
    };

    return (
        <div className="mt-12 bg-base-100 shadow-md p-6 rounded-xl">
            <h3 className="text-2xl font-semibold mb-4">Payments Overview</h3>
            <Bar data={data} options={options} />
        </div>
    );
};

export default OverviewUser;