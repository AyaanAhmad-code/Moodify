import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import FormGroup from '../components/FormGroup';
import { useAuth } from '../hooks/useAuth';
import '../style/auth.scss'; // Pointing to our new unified stylesheet

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // State to hold the error message

    const { loading, handleRegister } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError(""); // Clear any existing errors on new submission

        // Basic frontend validation
        if (!username || !email || !password) {
            return setError("Please fill in all fields.");
        }

        try {
            await handleRegister({ email, username, password });
            navigate("/app");
        } catch (err) {
            console.error("Registration failed:", err);
            
            // Extract the error message from your Express backend
            // (e.g., "User already exists" or "Email format invalid")
            const errorMessage = 
                err.response?.data?.message || 
                err.message || 
                "Registration failed. Please try again.";
                
            setError(errorMessage);
        }
    }

    return (
        <main className="auth-page">
            <div className="form-container">
                <h1>Create <span>Account</span></h1>
                
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
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            label="username" 
                            placeholder="Enter your username"
                        />
                    </div>
                    
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
                            type="password" // Keep password masked
                        />
                    </div>
                    
                    <button 
                        className="button" 
                        type="submit"
                        disabled={loading} // Prevent multiple submissions
                    >
                        {loading ? "Creating Account..." : "Register"}
                    </button>
                </form>
                
                <p>Already have an account? <Link to="/login">Login here</Link></p>
            </div>
        </main>
    );
};

export default Register;