import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddEmployee.css'; // Assuming you have a CSS file for styling

function AddEmployee() {
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'employee' // Default role set to employee
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/admin/add-employee', data, {
                headers: { 'x-auth-token': localStorage.getItem('token') },
            });
            if (response.status === 201) {
                navigate('/main'); // Redirect to main page after successful employee creation
            }
        } catch (err) {
            setError('Failed to add employee');
        }
    };

    return (
        <div className="add-employee-container">
            <h1>Add New Employee</h1>
            <p>Password needs a capital letter and a symbol and eight characters</p>
            {error && <div className="error-msg">{error}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    onChange={handleChange}
                    value={data.firstName}
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    onChange={handleChange}
                    value={data.lastName}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    value={data.email}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    value={data.password}
                    required
                />
                <button type="submit">Add Employee</button>
            </form>
        </div>
    );
}

export default AddEmployee;
