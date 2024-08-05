import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Messages.css'; // Assuming you have a CSS file for styling

const Messages = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [userMap, setUserMap] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch the list of employees
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/users/employees', {
                    headers: { 'x-auth-token': localStorage.getItem('token') },
                });
                setEmployees(response.data);
                // Create a map of user IDs to user names
                const userMap = {};
                response.data.forEach(employee => {
                    userMap[employee._id] = `${employee.firstName} ${employee.lastName}`;
                });
                setUserMap(userMap);
            } catch (err) {
                setError('Failed to fetch employees');
                console.error('Failed to fetch employees:', err);
            }
        };

        fetchEmployees();
    }, []);

    useEffect(() => {
        // Fetch messages for the selected employee
        if (selectedEmployee) {
            const fetchMessages = async () => {
                try {
                    const response = await axios.get(`http://localhost:4000/api/users/messages/${selectedEmployee}`, {
                        headers: { 'x-auth-token': localStorage.getItem('token') },
                    });
                    setMessages(response.data || []);
                } catch (err) {
                    setError('Failed to fetch messages');
                    console.error('Failed to fetch messages:', err);
                }
            };

            fetchMessages();
        }
    }, [selectedEmployee]);

    const handleEmployeeChange = (e) => {
        setSelectedEmployee(e.target.value);
    };

    const handleSendMessage = async () => {
        if (newMessage.trim() === '') return;

        try {
            const response = await axios.post(`http://localhost:4000/api/users/messages/${selectedEmployee}`, 
                { 
                    message: newMessage,
                    ticketId: 'your-ticket-id'  // Send a ticketId if needed
                }, 
                { headers: { 'x-auth-token': localStorage.getItem('token') } }
            );
            if (response.status === 200) {
                setMessages([...messages, response.data]);
                setNewMessage('');
            }
        } catch (err) {
            setError('Failed to send message');
            console.error('Failed to send message:', err);
        }
    };

    return (
        <div className="messages-container">
            <h1>Messages</h1>
            {error && <div className="error-msg">{error}</div>}
            <div className="employee-select-container">
                <label htmlFor="employeeSelect">Select an Employee:</label>
                <select id="employeeSelect" value={selectedEmployee} onChange={handleEmployeeChange}>
                    <option value="">--Select an Employee--</option>
                    {employees.map((employee) => (
                        <option key={employee._id} value={employee._id}>
                            {employee.firstName} {employee.lastName}
                        </option>
                    ))}
                </select>
            </div>
            <div className="messages-list-container">
                <h2>Messages</h2>
                {messages.length > 0 ? (
                    <ul>
                        {messages.map((message) => (
                            <li key={message._id} className="message-item">
                                <strong>{userMap[message.senderId] || message.senderId}:</strong> {message.message} <em>{new Date(message.timestamp).toLocaleString()}</em>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No messages found.</p>
                )}
            </div>
            <div className="send-message-container">
                <textarea 
                    value={newMessage} 
                    onChange={(e) => setNewMessage(e.target.value)} 
                    placeholder="Type your message here..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Messages;
