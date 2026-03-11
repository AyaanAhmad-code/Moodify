import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import FormGroup from '../components/FormGroup';
import { useAuth } from '../hooks/useAuth';
import '../style/auth.scss'; 

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // State to hold the error message
    
    const { loading, handleLogin } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError(""); // Clear any existing errors when the user tries again

        // Basic frontend validation to prevent empty submissions
        if (!email || !password) {
            return setError("Please fill in all fields.");
        }

        try {
            await handleLogin({ email, password });
            navigate("/app");
        } catch (err) {
            console.error("Login failed:", err);
            
            // Extract the error message. 
            // This safely checks if your Axios/Fetch backend returned a specific message.
            // If not, it falls back to a generic message.
            const errorMessage = 
                err.response?.data?.message || 
                err.message || 
                "Invalid email or password. Please try again.";
                
            setError(errorMessage);
        }
    }

    return (
        <main className="auth-page">
            <div className="form-container">
                <h1>Welcome <span>Back</span></h1>
                
                {/* Conditionally render the error alert */}
                {error && (
                    <div className="auth-error">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <FormGroup 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            label="email" 
                            placeholder="Enter your email" 
                        />
                    </div>
                    <div className="form-group">
                        <FormGroup 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            label="password" 
                            placeholder="Enter your password" 
                            type="password" 
                        />
                    </div>
                    <button 
                        className="button" 
                        type="submit"
                        disabled={loading} // Re-added the loading check so users can't spam the button
                    >
                        {loading ? "Authenticating..." : "Login"}
                    </button>
                </form>
                
                <p>Don't have an account? <Link to="/register">Register here</Link></p>
            </div>
        </main>
    );
};

export default Login;