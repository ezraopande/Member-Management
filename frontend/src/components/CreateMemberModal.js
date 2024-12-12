import React, { useState } from 'react';
import memberService from '../services/memberService';
import LoadingButton from '../components/ui/LoadingButton';
import { toast } from 'react-toastify';

const CreateMemberModal = ({ closeModal, handleMemberCreated }) => {
    const [name, setName] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [photo, setPhoto] = useState(null);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('name', name);
        formData.append('username', username);
        formData.append('email', email);
        formData.append('dob', dob);
        formData.append('password', password);
        if (photo) formData.append('profilePicture', photo);

        try {
            const res = await memberService.createMember(formData);
            handleMemberCreated();
            toast.success('Member created successfully');
            closeModal();
        } catch (err) {
            toast.error('Failed to create member');
            setError('Failed to create member');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-150">
                <h2 className="text-xl font-bold mb-4">Create Member</h2>

                {error && <p className="text-red-500">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label className="block mb-2">Name</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2">Username</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2">Email</label>
                            <input
                                type="email"
                                className="w-full p-2 border rounded"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2">Date of Birth</label>
                            <input
                                type="date"
                                className="w-full p-2 border rounded"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2">Photo</label>
                            <input
                                type="file"
                                className="w-full p-2 border rounded"
                                onChange={(e) => setPhoto(e.target.files[0])}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2">Password</label>
                            <input
                                type="password"
                                className="w-full p-2 border rounded"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-end mt-4">
                        <button
                            type="button"
                            className="bg-gray-400 text-white p-2 rounded mr-2"
                            onClick={closeModal}
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <LoadingButton isLoading={isLoading} type="submit">
                            Create
                        </LoadingButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateMemberModal;
