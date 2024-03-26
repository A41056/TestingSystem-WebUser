import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('Male'); // Default value set to Male
    const [birthDay, setBirthDay] = useState('');
    const navigate = useNavigate();
    const handleRegister = async (event) => {
        event.preventDefault();

        // Data filtering
        if (password.length < 6) {
            console.error('Password must be at least 6 characters long');
            return;
        }
        // Add more data filtering as needed...

        const requestBody = {
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            gender: gender,
            birthDay: birthDay
        };

        try {
            const response = await fetch('http://localhost:7000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                console.log('Registration successful');
            } else {
                console.error('Registration failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <div className="site-section">
            <div className="container">
                <h2 className="text-center mb-4">Web User Sign Up</h2> {/* Title */}
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-6 form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" id="username" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="col-md-6 form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="col-md-6 form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" id="firstName" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </div>
                            <div className="col-md-6 form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" id="lastName" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </div>
                            <div className="col-md-12 form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="col-md-6 form-group">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input type="text" id="phoneNumber" className="form-control" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                            </div>
                            <div className="col-md-6 form-group">
                                <label htmlFor="gender">Gender</label>
                                <select id="gender" className="form-control" value={gender} onChange={(e) => setGender(e.target.value)}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="col-md-12 form-group">
                                <label htmlFor="birthDay">Date of Birth</label>
                                <input type="date" id="birthDay" className="form-control" value={birthDay} onChange={(e) => setBirthDay(e.target.value)} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <button type="submit" onClick={handleRegister} className="btn btn-primary btn-block">Sign Up</button>
                            </div>
                        </div>
                        <div className="col-12 mt-3">
                            <button onClick={() => navigate('/login')} className="btn btn-link">Sign In</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
