import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router';
import '../style/loader.scss'; // We will create this file next

const Protected = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        // Return a sleek, theme-matching full-screen loader
        return (
            <div className="fullscreen-loader">
                <div className="spinner"></div>
                <p>Loading Moodify...</p>
            </div>
        );
    }

    if (!user) {
        // 'replace' prevents the redirect from cluttering the browser's back history
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default Protected;