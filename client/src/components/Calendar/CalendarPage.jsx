import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Inject, ScheduleComponent, Day, Week, Month } from '@syncfusion/ej2-react-schedule';
import '../../App.css';

import logoImg from '../../assets/logo.png';
import chartFillImg from '../../assets/Chart_fill.png';

// Registering Syncfusion license key
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NCaF1cWmhAYVdpR2Nbe050flVGal5XVAciSV9jS3pTfkVmWXtbdHVURWZZUw==');


const CalendarPage = () => {
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken.firstName && decodedToken.lastName) {
                setUserName(`${decodedToken.firstName} ${decodedToken.lastName}`);
            } else {
                setUserName("User");
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const Menus = [
        { title: "Back to Dashboard", src: chartFillImg, path: '/main' },
    ];

    return (
        <div className="flex">
            <div className={` ${open ? "w-72" : "w-20 "} bg-dark-purple h-screen p-5 pt-8 relative duration-300`}>
                <div className="flex gap-x-4 items-center">
                    <img
                        src={logoImg}
                        className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
                    />
                    <h1
                        className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`}
                    >
                        {userName}
                    </h1>
                </div>
                <ul className="pt-6">
                    {Menus.map((Menu, index) => (
                        <li
                            key={index}
                            className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                                ${Menu.gap ? "mt-9" : "mt-2"} 
                                ${location.pathname === Menu.path ? "bg-light-white" : ""}`}
                            onClick={Menu.onClick ? Menu.onClick : () => navigate(Menu.path)}
                        >
                            {Menu.src && <img src={Menu.src} />}
                            <span className={`${!open && "hidden"} origin-left duration-200`}>
                                {Menu.title}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="h-screen flex-1 p-7">
                <h1 className="text-2xl font-semibold ">Calendar Page</h1>
                {/* calendar component that i will hopefully get to make because it took forever to figure out how to get this sidebar on the page */}
                <ScheduleComponent>
                    <Inject services={[Day, Week, Month]} />
                </ScheduleComponent>
            </div>
        </div>
    );
}

export default CalendarPage;
