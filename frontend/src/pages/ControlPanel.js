import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Spinner from '../components/ui/Spinner';
import LoadingButton from '../components/ui/LoadingButton';
import api from '../api';

const ControlPanel = () => {
    const [formData, setFormData] = useState({
        websiteName: '',
        timezone: '',
        systemEmail: '',
        systemPhone: '',
    });

    const [favicon, setFavicon] = useState(null);
    const [logo, setLogo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [faviconPath, setFaviconPath] = useState('');
    const [logoPath, setLogoPath] = useState('');

    useEffect(() => {
        const fetchSettings = async () => {
            setIsLoading(true);
            try {
                const response = await api.get('/control-panel/settings');
                setFormData(response.data);
                setFaviconPath(response.data.favicon);
                setLogoPath(response.data.logo);
            } catch (err) {
                toast.error('Failed to fetch settings.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchSettings();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (type === 'favicon') setFavicon(file);
        else if (type === 'logo') setLogo(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const envFormData = new FormData();
            Object.keys(formData).forEach((key) => {
                envFormData.append(key, formData[key]);
            });

            if (favicon) envFormData.append('favicon', favicon);
            if (logo) envFormData.append('logo', logo);

            const response = await api.post('/control-panel/save', envFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success(response.data.message || 'Settings saved successfully!');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to save settings.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <Spinner />;

    return (
        <div className="bg-gray-100">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Control Panel</h1>
                <p className="text-gray-600">Manage system settings.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div>
                    <label className="block text-sm font-medium text-gray-700">Website Name</label>
                    <input
                        type="text"
                        name="websiteName"
                        value={formData.websiteName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Timezone</label>
                    <input
                        type="text"
                        name="timezone"
                        value={formData.timezone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">System Email</label>
                    <input
                        type="email"
                        name="systemEmail"
                        value={formData.systemEmail}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">System Phone</label>
                    <input
                        type="tel"
                        name="systemPhone"
                        value={formData.systemPhone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Favicon</label>
                    <div className="relative inline-block w-20 h-20 border rounded bg-gray-100">
                        <img
                            src={faviconPath || '/default-favicon.ico'}
                            alt="Favicon"
                            className="w-full h-full object-contain"
                        />
                        <button
                            type="button"
                            onClick={() => document.getElementById('faviconInput').click()}
                            className="absolute top-0 right-0 bg-blue-500 text-white p-1 rounded-lg shadow hover:bg-blue-600"
                        >
                            <i className="fas fa-pen"></i>
                        </button>
                    </div>
                    <input
                        id="faviconInput"
                        type="file"
                        onChange={(e) => handleFileChange(e, 'favicon')}
                        className="hidden"
                        accept=".png,.jpg,.ico"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Logo</label>
                    <div className="relative inline-block w-40 h-20 border rounded bg-gray-100">
                        <img
                            src={logoPath || '/default-logo.png'}
                            alt="Logo"
                            className="w-full h-full object-contain"
                        />
                        <button
                            type="button"
                            onClick={() => document.getElementById('logoInput').click()}
                            className="absolute top-0 right-0 bg-blue-500 text-white p-1 rounded-lg shadow hover:bg-blue-600"
                        >
                            <i className="fas fa-pen"></i>
                        </button>
                    </div>
                    <input
                        id="logoInput"
                        type="file"
                        onChange={(e) => handleFileChange(e, 'logo')}
                        className="hidden"
                        accept=".png,.jpg,.jpeg"
                    />
                </div>

                <div className="md:col-span-2">
                    <LoadingButton isLoading={isLoading} type="submit">
                        Save Settings
                    </LoadingButton>
                </div>
            </form>
        </div>
    );
};

export default ControlPanel;
