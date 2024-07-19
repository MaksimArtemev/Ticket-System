import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import controlImg from './assets/control.png';
import logoImg from './assets/logo.png';
import chartFillImg from './assets/Chart_fill.png';
import chatImg from './assets/Chat.png';
import userImg from './assets/User.png';
import calendarImg from './assets/Calendar.png';
import searchImg from './assets/Search.png';
import chartImg from './assets/Chart.png';
import folderImg from './assets/Folder.png';
import settingImg from './assets/Setting.png';
import MessagesPage from './MessagesPage';

function HomePage() {
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        fetch("http://localhost:4000")
            .then((res) => res.json())
            .then((data) => setMessage(data.message));
    }, []);

    const goToMainPage = () => {
        navigate('/main');
    }
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    epic GO team MAANGo 🥭
                    Let's make a super cool Ticket-System app! 1 2 3
                </p>
                <h1>{message}</h1>
                <button onClick={goToMainPage}>Go to About Page</button>
            </header>
        </div>
    );
}

function MainPage() {
    const [open, setOpen] = useState(true);
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

    return (
        <div className="flex">
            <div className={` ${open ? "w-72" : "w-20 "} bg-dark-purple h-screen p-5  pt-8 relative duration-300`}>
                <img
                    src={controlImg}
                    className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full  ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)}
                />
                <div className="flex gap-x-4 items-center">
                    <img
                        src={logoImg}
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
                            <img src={Menu.src} />
                            <span className={`${!open && "hidden"} origin-left duration-200`}>
                                {Menu.title}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="h-screen flex-1 p-7">
                <h1 className="text-2xl font-semibold ">Main Page</h1>
            </div>
        </div>
    );
}
 // ROUTER
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/messages" element={<MessagesPage />} /> 
            </Routes>
        </Router>
    );
}

export default App;
