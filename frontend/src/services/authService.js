import api from '../api';

export const registerUser = async (formData) => {
    try {
        const response = await api.post('/auth/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log(response.data);
    } catch (err) {
        throw new Error('Registration failed. Please try again.');
    }
};

export const login = async (username, password) => {
    try {
        const response = await api.post('/auth/login', { username, password });
        const { token, user } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        return token;
    } catch (err) {
        throw new Error('Invalid username or password');
    }
};

export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};

export const logout = () => {
    localStorage.removeItem('token');
};
