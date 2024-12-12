import api from '../api';

const getDashboardStats = async () => {
    try {
        const response = await api.get('/dashboard/stats');
        return response.data;
    } catch (error) {
        throw new Error('Error fetching dashboard stats');
    }
};

export default {
    getDashboardStats,
};
