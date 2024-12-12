import React, { useState, useEffect } from 'react';
import Spinner from '../components/ui/Spinner';
import { toast } from 'react-toastify';
import memberService from '../services/memberService';
import { baseUrl } from '../constants/api.constant';
import { useLocation } from 'react-router-dom';
import LoadingButton from '../components/ui/LoadingButton';
import { useDispatch } from 'react-redux';
import { fetchUserProfile } from '../slices/userSlice';

const ProfileEdit = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        dob: '',
    });
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
    });
    const [photo, setPhoto] = useState('');
    const [newPhoto, setNewPhoto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        const state = location.state;
        if (state && state.tab) {
            setActiveTab(state.tab);
        }

        const fetchProfile = async () => {
            try {
                const data = await memberService.getProfile();
                setFormData({
                    name: data.name || '',
                    username: data.username || '',
                    email: data.email || '',
                    dob: data.dob ? data.dob.split('T')[0] : '',
                });
                setPhoto(data.photo || '');
                setLoading(false);
            } catch (err) {
                toast.error('Error fetching profile');
                setLoading(false);
            }
        };

        fetchProfile();
    }, [location]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewPhoto(file);
            const previewURL = URL.createObjectURL(file);
            setPhoto(previewURL);
        }
    };
    

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const profileData = new FormData();
            profileData.append('name', formData.name);
            profileData.append('username', formData.username);
            profileData.append('email', formData.email);
            profileData.append('dob', formData.dob);

            if (newPhoto) {
                profileData.append('profilePicture', newPhoto);
            }

            const res = await memberService.updateProfile(profileData);
            toast.success(res.message);
            
            // dispatch(fetchUserProfile());
        } catch (err) {
            toast.error('Error updating profile');
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const res = await memberService.changePassword(passwordData);
            toast.success(res.message);
        } catch (err) {
            toast.error('Error updating password');
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    if (loading) return <Spinner />;

    return (
        <div className="max-w-4xl mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
            <div className="border-b mb-4">
                <ul className="flex space-x-4">
                    <li>
                        <button
                            onClick={() => handleTabClick('profile')}
                            className={`px-4 py-2 ${
                                activeTab === 'profile' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
                            }`}
                        >
                            Profile
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleTabClick('password')}
                            className={`px-4 py-2 ${
                                activeTab === 'password' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
                            }`}
                        >
                            Password
                        </button>
                    </li>
                </ul>
            </div>

            {/* Tab Content */}
            <div className="bg-white shadow-md p-6 rounded-md">
                {activeTab === 'profile' && (
                    <form onSubmit={handleProfileSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleFormChange}
                                    className="w-full border px-4 py-2 rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleFormChange}
                                    className="w-full border px-4 py-2 rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleFormChange}
                                    className="w-full border px-4 py-2 rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Date of Birth</label>
                                <input
                                    type="date"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleFormChange}
                                    className="w-full border px-4 py-2 rounded"
                                />
                            </div>
                        </div>
                        <div className="mb-4 mt-4 flex items-center space-x-4">
                            <div className="relative inline-block w-20 h-20 border rounded bg-gray-100">
                                <img 
                                    src={photo ? photo.startsWith('blob:') ? photo : `${baseUrl}/${photo}` : `https://via.placeholder.com/40`}
                                    alt="Preview"
                                    className="w-full h-full object-contain"
                                />

                                <button
                                    type="button"
                                    onClick={() => document.getElementById('photoInput').click()}
                                    className="absolute top-0 right-0 bg-blue-500 text-white p-1 rounded-lg shadow hover:bg-blue-600"
                                >
                                    <i className="fas fa-pen"></i>
                                </button>
                            </div>
                            <input
                                id="photoInput"
                                type="file"
                                onChange={handlePhotoChange}
                                className="hidden"
                                accept=".png,.jpg,.jpeg"
                            />
                        </div>
                        <LoadingButton isLoading={isLoading} type="submit">
                            Save Profile
                        </LoadingButton>
                    </form>
                )}

                {activeTab === 'password' && (
                    <form onSubmit={handlePasswordSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Old Password</label>
                            <input
                                type="password"
                                name="oldPassword"
                                value={passwordData.oldPassword}
                                onChange={(e) =>
                                    setPasswordData({ ...passwordData, oldPassword: e.target.value })
                                }
                                className="w-full border px-4 py-2 rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">New Password</label>
                            <input
                                type="password"
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={(e) =>
                                    setPasswordData({ ...passwordData, newPassword: e.target.value })
                                }
                                className="w-full border px-4 py-2 rounded"
                                required
                            />
                        </div>
                        <LoadingButton isLoading={isLoading} type="submit">
                            Change Password
                        </LoadingButton>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ProfileEdit;
