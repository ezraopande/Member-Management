import api from '../api';

const getActivityLogs = async () => {
    try {
        const response = await api.get('/activity-logs');
        return response.data;
    } catch (err) {
        throw new Error('Failed to fetch activity logs');
    }
};

export default {
    getActivityLogs,
};
