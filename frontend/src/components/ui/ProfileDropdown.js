import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaListAlt, FaLock } from 'react-icons/fa';
import Avatar from '../ui/Avatar';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../slices/userSlice';

const ProfileDropdown = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const user = useSelector((state) => state.user.user) || { name: 'Guest', photoUrl: '', role: 2 };
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleDropdown = () => {
        setIsProfileOpen((prev) => !prev);
    };

    const closeDropdown = () => {
        setIsProfileOpen(false);
    };

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        closeDropdown();
        navigate('/login');
    };

    return (
        <div ref={dropdownRef} className="relative flex items-center space-x-2">
            <div
                onClick={toggleDropdown}
                className="flex items-center space-x-2 cursor-pointer"
            >
                <Avatar photo={user.photoUrl} name={user.name} />
                <span className="text-sm" style={{ whiteSpace: 'nowrap' }}>
                    {user.name}
                </span>
            </div>

            {isProfileOpen && (
                <div
                    className="absolute top-full mt-2 bg-white shadow-md p-4 rounded z-50 w-64 right-0 border"
                >
                    <div className="flex items-center space-x-3 border-b pb-4 mb-4">
                        <Avatar photo={user.photoUrl} name={user.name} />
                        <div>
                            <h4 className="text-sm font-semibold">{user.name}</h4>
                            <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                    </div>

                    <ul className="space-y-3">
                        <li>
                            <Link
                                to="/profile"
                                state={{ tab: 'profile' }}
                                onClick={closeDropdown}
                                className="flex items-center space-x-2 hover:text-blue-600"
                            >
                                <FaUser className="text-gray-500" />
                                <span>Profile</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/profile"
                                state={{ tab: 'password' }}
                                onClick={closeDropdown}
                                className="flex items-center space-x-2 hover:text-blue-600"
                            >
                                <FaLock className="text-gray-500" />
                                <span>Change Password</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/activity-logs"
                                onClick={closeDropdown}
                                className="flex items-center space-x-2 hover:text-blue-600"
                            >
                                <FaListAlt className="text-gray-500" />
                                <span>Activity Log</span>
                            </Link>
                        </li>
                    </ul>

                    <div className="border-t mt-4 pt-4">
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 text-red-500 hover:text-red-600 w-full"
                        >
                            <FaSignOutAlt className="text-gray-500" />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;