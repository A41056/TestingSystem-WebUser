import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Import jwt_decode

function Login({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const handleLogin = async (event) => {
        event.preventDefault();

        // Form validation
        if (!username || !password) {
            setError('Please enter both username and password');
            return;
        }

        try {
            // Make API call to your ASP.NET backend
            const response = await fetch(`${BASE_URL}/Auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
        
            if (response.ok) {
                const token = await response.text(); // Extract token from response
                const decodedToken = jwtDecode(token); // Decode the token
                const { given_name: username, role: roleId} = decodedToken;
                console.log(decodedToken);
                console.log(roleId);
                localStorage.setItem('token', token);

                if (roleId ==='Admin') 
                {
                    onLoginSuccess(username);
                    navigate('/admin'); // Navigate to admin section if role is admin
                } else {
                    navigate('/home'); // Navigate to home for other roles
                }

            } else {
                // Handle login failure
                setError('Invalid username or password');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('An error occurred while logging in');
        }
    };

    return (
        <div className="site-section mt-5">
            <div className="container">
                <h2 className="text-center mb-4">Web User Sign In</h2> {/* Title */}
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <div className="row justify-content-center"> {/* Centering the form */}
                            <form onSubmit={handleLogin}>
                                <div className="col-md-12 form-group">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        className="form-control form-control-lg"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col-md-12 form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control form-control-lg"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                {error && <div className="col-12 text-danger mb-3">{error}</div>}
                                <div className="col-12">
                                    <div className="text-center"> {/* Centering the Sign In button */}
                                        <button type="submit" className="btn btn-primary btn-lg px-5">Sign In</button>
                                    </div>
                                </div>
                                <div className="col-12 mt-3">
                                    <button onClick={() => navigate('/register')} className="btn btn-link">Sign Up</button> {/* Register Button */}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
