import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Messages.css';

const Messages = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:4000/api/employee/assigned-users', {
                    headers: { 'x-auth-token': token },
                });
                setUsers(response.data);
                console.log('Fetched users:', response.data);
            } catch (err) {
                console.error('Failed to fetch users:', err);
                setError('Failed to fetch users.');
            }
        };

        const fetchUserId = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:4000/api/auth/me', {
                    headers: { 'x-auth-token': token },
                });
                const userId = response.data._id;
                localStorage.setItem('userId', userId);
                console.log('User ID set in local storage:', userId);
            } catch (err) {
               
            }
        };

        if (!localStorage.getItem('userId')) {
            fetchUserId();
        }

        fetchUsers();
    }, []);

    const fetchMessages = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:4000/api/messages/conversation/${userId}`, {
                headers: { 'x-auth-token': token },
            });
            setMessages(response.data);
            console.log('Fetched messages:', response.data);
        } catch (err) {
            console.error('Failed to fetch messages:', err);
            setError('Failed to fetch messages.');
        }
    };

    const handleSendMessage = async () => {
        if (!selectedUser || !newMessage) return;

        try {
            const token = localStorage.getItem('token');
            const senderId = localStorage.getItem('userId'); // Fetch senderId from local storage
            const ticketId = '66b1ab73942319b59ddf6f3b'; // Set this dynamically based on the selected ticket

            console.log('Sending message with:', { senderId, receiverId: selectedUser, message: newMessage, ticketId });

            await axios.post('http://localhost:4000/api/messages/send', {
                senderId,
                receiverId: selectedUser,
                message: newMessage,
                ticketId,
            }, {
                headers: { 'x-auth-token': token },
            });
            setNewMessage('');
            fetchMessages(selectedUser);
            console.log('Message sent successfully');
        } catch (err) {
            console.error('Failed to send message:', err);
           
        }
    };

    return (
        <div className="messages-container">
            <div className="user-select">
                <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                    <option value="">Select a user</option>
                    {users.map((user) => (
                        <option key={user._id} value={user._id}>
                            {user.firstName} {user.lastName}
                        </option>
                    ))}
                </select>
            </div>
            <div className="messages">
                {messages.map((msg) => (
                    <div key={msg._id} className={`message ${msg.senderId === localStorage.getItem('userId') ? 'sent' : 'received'}`}>
                        <p>{msg.message}</p>
                    </div>
                ))}
            </div>
            <div className="message-input">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message"
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default Messages;
