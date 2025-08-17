import { useQuery } from "@tanstack/react-query";
import { Bar } from "react-chartjs-2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OverviewGuide = () => {
const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: assignedData = {} } = useQuery({
    queryKey: ["assignedBookings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/assigned?email=${user.email}&page=1&limit=50`);
      return res.data;
    },
    enabled: !!user?.email,
  });

    const bookings = assignedData.bookings || [];

// Prepare chart data
  const data = {
    labels: bookings.map((b) => b.packageName),
    datasets: [
      {
        label: "Price",
        data: bookings.map((b) => b.price),
        backgroundColor: "rgba(53, 162, 235, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "My Assigned Tours (Price per Package)" },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full p-6 mt-5">
        <h3 className="text-4xl font-bold">Overview</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default OverviewGuide;