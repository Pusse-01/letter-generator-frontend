import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config';

const SignupForm = ({ handleLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('')

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            // Send a POST request to the signup endpoint
            await axios.post(`${API_BASE_URL}/signup/`, {
                name: name,
                username: username,
                password: password,
            }).then((response) => {
                if (!response.ok) {
                    throw new Error('Invalid credentials');
                }
                return response.json();
            })
                .then((data) => {
                    localStorage.setItem('user', JSON.stringify(data.user));
                    // Login successful, handle the response data (e.g., save the token, update state, etc.)
                    handleLogin();
                })
        } catch (error) {
            // Handle signup error (e.g., display error message)
            console.error('Signup failed:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleFormSubmit} className="mb-8" action="#">
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="form-label label-text">Name</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                        className="my-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-md border-gray-300 rounded-md px-2"
                        required
                    />
                    <label className="label">
                        <span className="form-label label-text">Username</span>
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                        className="my-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-md border-gray-300 rounded-md px-2"
                        required
                    />
                    <label className="label">
                        <span className="form-label label-text">Password</span>
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="my-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-md border-gray-300 rounded-md px-2"
                        required
                    />
                    <button className="btn bg-blue-800 btn-block px-2 py-1 rounded-md text-white text-sm">Signup </button>
                </div>
            </form>
            <p className="mt-5 text-txt-blue-grey">
                Already have an account?{' '}
                <Link to="/login" className="text-main-accent">
                    Login
                </Link>
            </p>
        </div>
    );
};

export default SignupForm;