import axios from 'axios';
import { useNavigate } from 'react-router';
import useAuth from './useAuth';

const axiosSecure = axios.create({
    baseURL: `https://tour-nest-server.vercel.app`,
});

const useAxiosSecure = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    // Attach token from localStorage to every request
    axiosSecure.interceptors.request.use(config => {
        const token = localStorage.getItem('access-token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, error => {
        return Promise.reject(error);
    });

    // Handle auth errors
    axiosSecure.interceptors.response.use(res => res, error => {
        const status = error.response?.status;
        
        if (status === 401) {
            logout()
                .then(() => navigate('/login'))
                .catch(err => console.error(err));
        } else if (status === 403) {
            navigate('/forbidden');
        }

        return Promise.reject(error);
    });

    return axiosSecure;
};

export default useAxiosSecure;
