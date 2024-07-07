import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  // Fetching message from backend on mount
  useEffect(() => {
    fetch("https://ticket-system-back-end.onrender.com")
        .then((res) => res.json())
        .then((data) => setMessage(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          GO team MAANGo 🥭
          Let's make a super cool Ticket-System app! cheeeeeeck
        </p>
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
      <body>
        <div className="App">
          <h1>{message}</h1>
        </div>
      </body>
    </div>
  );
}

export default App;
