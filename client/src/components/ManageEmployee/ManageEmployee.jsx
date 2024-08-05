import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageEmployee.css';

const ManageEmployee = () => {
    const [employees, setEmployees] = useState([]);
    const [newEmployee, setNewEmployee] = useState({ firstName: '', lastName: '', email: '', password: '', role: 'employee' });
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch the list of employees from the server
        axios.get('http://localhost:4000/api/admin/all-employees', {
            headers: { 'x-auth-token': localStorage.getItem('token') },
        })
        .then(response => {
            setEmployees(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the employees!', error);
        });
    }, []);

    const handleAddEmployee = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/api/admin/add-employee', newEmployee, {
            headers: { 'x-auth-token': localStorage.getItem('token') },
        })
        .then(response => {
            setEmployees([...employees, response.data]);
            setNewEmployee({ firstName: '', lastName: '', email: '', password: '', role: 'employee' });
        })
        .catch(error => {
            setError('Error adding employee');
            console.error('There was an error adding the employee!', error);
        });
    };

    const handleDeleteEmployee = (id) => {
        console.log(`Attempting to delete employee with id: ${id}`); // Log the employee ID
        axios.delete(`http://localhost:4000/api/admin/delete-employee/${id}`, {
            headers: { 'x-auth-token': localStorage.getItem('token') },
        })
        .then(response => {
            alert('Employee deleted successfully');
            setEmployees(employees.filter(employee => employee._id !== id));
          
        })
        .catch(error => {
            console.error('There was an error deleting the employee!', error);
            alert('Failed to delete employee');
        });
    };

    return (
        <div className="manage-employee-container">
            <h1>Manage Employees</h1>

            <div className="add-employee-container">
                <h2>Add Employee</h2>
                {error && <p className="error-msg">{error}</p>}
                <form onSubmit={handleAddEmployee}>
                    <input
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        onChange={(e) => setNewEmployee({ ...newEmployee, firstName: e.target.value })}
                        value={newEmployee.firstName}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        onChange={(e) => setNewEmployee({ ...newEmployee, lastName: e.target.value })}
                        value={newEmployee.lastName}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                        value={newEmployee.email}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
                        value={newEmployee.password}
                        required
                    />
                    <button type="submit">Add Employee</button>
                </form>
            </div>

            <div className="employee-list-container">
                <h2>Employee List</h2>
                <ul>
                    {employees.map(employee => (
                        <li key={employee._id}>
                            <span>{employee.firstName} {employee.lastName} ({employee.email})</span>
                            <button onClick={() => handleDeleteEmployee(employee._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ManageEmployee;
