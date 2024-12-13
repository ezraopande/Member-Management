import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ActivityLogPage from './pages/ActivityLogPage';
import Layout from './layouts/Layout';
import Dashboard from './pages/Dashboard';
import MemberManagement from './pages/MemberManagement';
import { isAuthenticated } from './services/authService';
import ProfileEdit from './pages/ProfileEdit';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ControlPanel from './pages/ControlPanel';
import APIOverview from './pages/APIOverview';
import APIDocumentation from './pages/APIDocumentation';
import RolesPage from './pages/RolesPage';

const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" />;
};

const App = () => (
    <Router>
        <div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar
                newestOnTop
                closeOnClick
                pauseOnHover
                draggable
                theme="colored"
            />

            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="profile" element={<ProfileEdit />} />
                    <Route path="members" element={<MemberManagement />} />
                    <Route path="roles" element={<RolesPage />} />
                    <Route path="activity-logs" element={<ActivityLogPage />} />
                    <Route path="control-panel" element={<ControlPanel />} />
                    <Route path="/api-docs" element={<APIOverview />} />
                    <Route path="/api-docs/:sectionName" element={<APIDocumentation />} />
                </Route>
            </Routes>
        </div>
    </Router>
);

export default App;
