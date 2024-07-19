import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import chartFillImg from './assets/Chart_fill.png';
import chatImg from './assets/Chat.png';
import userImg from './assets/User.png';
import calendarImg from './assets/Calendar.png';
import searchImg from './assets/Search.png';
import chartImg from './assets/Chart.png';
import folderImg from './assets/Folder.png';
import settingImg from './assets/Setting.png';
import controlImg from './assets/control.png';
import logoImg from './assets/logo.png';
import './App.css';

const socket = io('http://localhost:4000'); // Ensure this matches your backend port

function MessagesPage() {
    const [open, setOpen] = useState(true);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const navigate = useNavigate(); // Hook for navigation
    const Menus = [
        { title: "Dashboard", src: chartFillImg, path: "/main" },
        { title: "Messages", src: chatImg, path: "/messages" },
        { title: "User", src: userImg, gap: true, path: "/user" },
        { title: "Tickets in Calendar ", src: calendarImg, path: "/calendar" },
        { title: "Search", src: searchImg, path: "/search" },
        { title: "Ticket Analytics", src: chartImg, path: "/analytics" },
        { title: "Files ", src: folderImg, gap: true, path: "/files" },
        { title: "Setting", src: settingImg, path: "/setting" },
    ];

    useEffect(() => {
        const ticketId = 'unique-ticket-id'; // Use a consistent and unique ticket id
        socket.emit('joinRoom', ticketId);

        axios.get(`http://localhost:4000/api/tickets/${ticketId}/chat`)
            .then(response => {
                setMessages(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the messages!', error);
            });

        socket.on('receiveMessage', (message) => {
            setMessages(prevMessages => [...prevMessages, message]);
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, []);

    const sendMessage = () => {
        const ticketId = 'unique-ticket-id'; // Use the same consistent and unique ticket id
        const message = {
            ticketId,
            senderId: 'user', // replace with actual user
            message: newMessage,
            timestamp: new Date()
        };

        socket.emit('sendMessage', message);

        axios.post(`http://localhost:4000/api/tickets/${ticketId}/chat`, message)
            .then(response => {
                setMessages(prevMessages => [...prevMessages, response.data]);
            })
            .catch(error => {
                console.error('There was an error sending the message!', error);
            });

        setNewMessage('');
    };

    return (
        <div className="flex shiny-background">
            <div className={` ${open ? "w-72" : "w-20 "} bg-dark-purple h-screen p-5  pt-8 relative duration-300`}>
                <img
                    src={controlImg}
                    alt="Control"
                    className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full  ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)}
                />
                <div className="flex gap-x-4 items-center">
                    <img
                        src={logoImg}
                        alt="Logo"
                        className={`cursor-pointer duration-500 ${ open && "rotate-[360deg]"} `}
                    />
                    <h1 className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`}>
                        User/Admin
                    </h1>
                </div>
                <ul className="pt-6">
                    {Menus.map((Menu, index) => (
                        <li
                            key={index}
                            className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                                ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"} `}
                            onClick={() => navigate(Menu.path)} // Navigate to the path on click
                        >
                            <img src={Menu.src} alt={Menu.title} />
                            <span className={`${!open && "hidden"} origin-left duration-200`}>
                                {Menu.title}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="h-screen flex-1 p-7 table-container shiny-background">
                <h1 className="text-2xl font-semibold mb-4" style={{ color: '#000000' }}>Messages Page</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Sender</th>
                            <th>Message</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="message-box">No messages available</td>
                            </tr>
                        ) : (
                            messages.map((msg, index) => (
                                <tr key={index}>
                                    <td>{msg.senderId}</td>
                                    <td>{msg.message}</td>
                                    <td>{new Date(msg.timestamp).toLocaleString()}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                <div>
                    <input 
                        type="text" 
                        value={newMessage} 
                        onChange={(e) => setNewMessage(e.target.value)} 
                        placeholder="Type your message" 
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default MessagesPage;
