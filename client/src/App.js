import { useState } from "react";
const App = () => {
    const [open, setOpen] = useState(true);
    const Menus = [
        { title: "Dashboard", src: "Chart_fill" },
        { title: "Messages", src: "Chat" },
        { title: "User", src: "User", gap: true },
        { title: "Tickets in Calendar ", src: "Calendar" },
        { title: "Search", src: "Search" },
        { title: "Ticket Analitics", src: "Chart" },
        { title: "Files ", src: "Folder", gap: true },
        { title: "Setting", src: "Setting" },
    ];

    return (
        <div className="flex">
            <div
                className={` ${
                    open ? "w-72" : "w-20 "
                } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
            >
                <img
                    src="./src/assets/control.png"
                    className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)}
                />
                <div className="flex gap-x-4 items-center">
                    <img
                        src="./src/assets/logo.png"
                        className={`cursor-pointer duration-500 ${
                            open && "rotate-[360deg]"
                        }`}
                    />
                    <h1
                        className={`text-white origin-left font-medium text-xl duration-200 ${
                            !open && "scale-0"
                        }`}
                    >
                        Designer
                    </h1>
                </div>
                <ul className="pt-6">
                    {Menus.map((Menu, index) => (
                        <li
                            key={index}
                            className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                                index === 0 && "bg-light-white"
                            } `}
                        >
                            <img src={`./src/assets/${Menu.src}.png`} />
                            <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="h-screen flex-1 p-7">
                <h1 className="text-2xl font-semibold ">Home Page</h1>
            </div>
        </div>
    );
};
export default App;




// import logo from './logo.svg';
// import './App.css';
// import { useEffect, useState } from "react";
//
// function App() {
//   const [message, setMessage] = useState("");
//
//   // Fetching message from backend on mount
//   useEffect(() => {
//     fetch("http://localhost:4000") //"https://ticket-system-back-end.onrender.com")//"https://ticket-system-xl4u.onrender.com"// back-end
//         .then((res) => res.json())
//         .then((data) => setMessage(data.message));
//   }, []);
//
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//           <p>
//               GO team MAANGo 🥭
//               Let's make a super cool Ticket-System app! 1 2 3
//               <h1>{message}</h1>
//           </p>
//           {/* <p>
//           Edit <code>src/App.jsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a> */}
//       </header>
//       <body>
//         <div className="App">
//           <h1>{message}</h1>
//         </div>
//       </body>
//     </div>
//   );
// }
//
// export default App;
