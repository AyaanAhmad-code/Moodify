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
    const [showPassword, setShowPassword] = useState(false); 

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
                    
                    {/* ⚡ FIXED: Using native HTML tags to guarantee the 'type' toggle works */}
                    <div className="form-group" style={{ position: 'relative' }}>
                        <label>password</label>
                        <input 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Enter your password" 
                            type={showPassword ? "text" : "password"} 
                            style={{ paddingRight: '45px' }} // Prevent text from hiding behind the icon
                        />
                        
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: 'absolute',
                                right: '15px',
                                bottom: '13px', 
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text-muted)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                padding: 0,
                                zIndex: 10 // Ensure the button is always clickable
                            }}
                            title={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? (
                                /* Eye Off Icon */
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                                    <line x1="2" x2="22" y1="2" y2="22"/>
                                </svg>
                            ) : (
                                /* Eye Icon */
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                                    <circle cx="12" cy="12" r="3"/>
                                </svg>
                            )}
                        </button>
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