import React, { useEffect, useState } from 'react';
import { Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Main from './components/Main';
import Signup from './components/Signup';
import Login from './components/Login';
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
import TicketCreationForm from './components/TicketCreationForm';
import plusImg from './assets/plus.png';

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
        <div className="App flex-1 h-screen">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    GO team MAANGo 🥭
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
    const [showModal, setShowModal] = useState(false);
    const handleModalClose = (e) => {
        if(e.target.id === "close-modal-container") setShowModal(false)
    }
    const createTicketButton = <button onClick={()=> setShowModal(true)}>create ticket</button>
    const Menus = [
        { title: "Dashboard", src: chartFillImg },
        { title: "Messages", src: chatImg },
        { title: "User", src: userImg, gap: true },
        { title: "Tickets in Calendar ", src: calendarImg },
        { title: "Search", src: searchImg },
        { title: "Ticket Analitics", src: chartImg },
        { title: "Files ", src: folderImg, gap: true },
        { title: "Setting", src: settingImg },
        { title: createTicketButton, src: plusImg}
    ];

    return (
        <div className="flex">
            <div
                className={` ${open ? "w-72" : "w-20 "} bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
            >
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
                    <h1
                        className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`}
                    >
                        User/Admin
                    </h1>
                </div>
                <ul className="pt-6">
                    {Menus.map((Menu, index) => (
                        <li
                            key={index}
                            className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                                ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"} `}
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
            <TicketCreationForm onClose={handleModalClose} visible={showModal}/>
        </div>
        
    );
}

function App() {
    const user = localStorage.getItem("token");

    return (
        <Routes>


            {user && <Route path="/" exact element={<Main />} />}
            <Route path="/signup" exact element={<Signup />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/" element={<Navigate replace to="/login" />} />

            <Route path="/main" element={<MainPage />} />
        </Routes>

    );
}

export default App;


/*<Route path="/" element={<HomePage />} />*/