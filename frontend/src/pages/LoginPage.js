import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../slices/userSlice';
import LoadingButton from '../components/ui/LoadingButton';

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        email: '',
        dob: '',
        confirmPassword: '',
        profilePicture: null,
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector((state) => state.user);
    const settings = useSelector((state) => state.settings.data);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prevData) => ({ ...prevData, profilePicture: file }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLogin) {
            dispatch(loginUser({ username: formData.username, password: formData.password }))
                .unwrap() 
                .then(() => navigate('/dashboard'))
                .catch((err) => console.error(err.message));
        } else {
            if (formData.password !== formData.confirmPassword) {
                console.error('Passwords do not match');
                return;
            }

            const form = new FormData();
            Object.keys(formData).forEach((key) => {
                if (formData[key]) form.append(key, formData[key]);
            });

            dispatch(registerUser(form))
                .unwrap()
                .then(() => setIsLogin(true))
                .catch((err) => console.error(err.message));
        }
    };

    return (
        <div className="flex min-h-screen">
            <div
                className="hidden lg:flex flex-col items-center justify-center w-1/3 p-12 text-white h-screen"
                style={{
                    background: "linear-gradient(to bottom, #3B82F6, #1E3A8A)",
                }}
            >
                <div className="max-w-md text-center">
                    <img
                        src={settings.logo}
                        alt="GoldTech Logo"
                        className="h-8 mx-auto mb-6"
                    />
                    <p className="text-lg mb-4">
                        Welcome to {settings.websiteName}.{' '}
                        <span className="block">
                            {isLogin ? 'Login to Get Started' : 'Create an Account to Join Us'}
                        </span>
                    </p>

                </div>
                <div className="absolute bottom-4 text-center text-sm w-full">
                    Copyright &copy; {new Date().getFullYear()} {settings.websiteName}
                </div>
            </div>


            <div className="flex-1 flex items-center justify-center p-8">
                <div className="max-w-md w-full">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        {isLogin ? 'Welcome back!' : 'Register for an Account'}
                    </h2>
                    <p className="text-sm text-gray-600 mb-8">
                        {isLogin
                            ? 'Please enter your credentials to sign in!'
                            : 'Fill out the form below to create an account.'}
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && <p className="text-red-500 text-center">{error}</p>}

                        {!isLogin && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                                        <input
                                            type="date"
                                            name="dob"
                                            value={formData.dob}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                        <input
                                            type="text"
                                            name="username"
                                            autoComplete="new-username"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            autoComplete="new-password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Confirm Password
                                        </label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            autoComplete="new-password"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
                                    <input
                                        type="file"
                                        name="profilePicture"
                                        onChange={handleFileChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </>
                        )}

                        {isLogin && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        autoComplete="new-username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        autoComplete="new-password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                            </>
                        )}

                        <LoadingButton
                            isLoading={status === 'loading'}
                            loadingText={isLogin ? 'Signing in...' : 'Registering...'}
                            type="submit"
                        >
                            {isLogin ? 'Sign In' : 'Register'}
                        </LoadingButton>
                    </form>
                    <p className="mt-4 text-sm text-center text-gray-600">
                        {isLogin ? (
                            <>
                                Don't have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => setIsLogin(false)}
                                    className="text-blue-500 hover:underline"
                                >
                                    Sign up
                                </button>
                            </>
                        ) : (
                            <>
                                Already have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => setIsLogin(true)}
                                    className="text-blue-500 hover:underline"
                                >
                                    Login
                                </button>
                            </>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
