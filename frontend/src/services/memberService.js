import api from '../api';

const getMembers = async () => {
    try {
        const response = await api.get('/members');
        return response.data;
    } catch (err) {
        throw new Error('Failed to load members');
    }
};

const createMember = async (memberData) => {
    try {
        const response = await api.post('/members', memberData);
        return response.data;
    } catch (err) {
        throw new Error('Failed to create member');
    }
};

const getProfile = async () => {
    const response = await api.get(`/members/profile`);
    return response.data;
};

const updateMember = async (id, memberData) => {
    try {
        const response = await api.put(`/members/${id}`, memberData);
        return response.data;
    } catch (err) {
        throw new Error('Failed to update member');
    }
};

const updateProfile = async (profileData) => {
    try {
        const response = await api.put(`/members/profile`, profileData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (err) {
        throw err.response?.data || new Error('Failed to update profile');
    }
};


const deleteMember = async (id) => {
    try {
        await api.delete(`/members/${id}`);
    } catch (err) {
        throw new Error('Failed to delete member');
    }
};

const changePassword = async (passwordData) => {
    try {
        const response = await api.put(`/members/profile/change-password`, passwordData);
        return response.data;
    } catch (err) {
        throw new Error('Failed to change password');
    }
};

export default {
    getMembers,
    createMember,
    updateMember,
    deleteMember,
    getProfile,
    changePassword,
    updateProfile
};
