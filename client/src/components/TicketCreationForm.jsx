import React, {useState} from 'react'
import ticketIssue0 from '../assets/ticket-issue-0.png';
import ticketIssue1 from '../assets/ticket-issue-1.png';
import ticketIssue2 from "../assets/ticket-issue-2.png";
import ticketIssue3 from "../assets/ticket-issue-3.png";
import ticketIssue4 from "../assets/ticket-issue-4.png";
import ticketIssue5 from "../assets/ticket-issue-5.png";
import submitCheck  from "../assets/checked.png";
import axios from 'axios';


export default function TicketCreationForm({visible, onClose, userID}) {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [showForm, setShowForm] = useState(true);

  const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  const ticketTopics = [
    { title: "Repair", desc: lorem, icon: ticketIssue5},
    { title: "Account", desc: lorem, icon: ticketIssue2},
    { title: "Product", desc: lorem, icon: ticketIssue4},
    { title: "Billing", desc: lorem, icon: ticketIssue3},
    { title: "Software", desc: lorem, icon: ticketIssue1},
    { title: "Other", desc: lorem, icon: ticketIssue0}
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('topic', selectedTopic);
    formData.append('subject', subject);
    formData.append('description', description);
    axios.post('http://localhost:4000/tickets', formData, {
      headers: {
        'Content-Type': 'application/json' 
      }
    })
    .then(response => { console.log(response) });

    setShowForm(false);
  }

  if(!visible) return null;
  else if (visible && !showForm) {
    return (
      <div id="close-modal-container" onClick={onClose} className="h-screen w-screen absolute bg-black bg-opacity-30 backdrop-blur-sm flex justify-center place-items-center z-40">
        <div className="bg-white py-3 px-6 rounded w-3/5 size-11/12 overflow-auto text-center">
            <div className="flex justify-end">
              <button id="close-modal-container" onClick={onClose}>X
              </button>
            </div>
          <img src={submitCheck} className="mx-auto w-1/3 pt-6 pb-6" />
          <p className="pt-6">Your ticket has successfully been submitted!</p>
        </div>
      </div>
    )
  }

  return (
    <div id="close-modal-container" onClick={onClose} className="h-screen w-screen absolute bg-black bg-opacity-30 backdrop-blur-sm flex justify-center place-items-center z-40">
      <div className="bg-white py-3 px-6 rounded w-3/5 size-11/12 overflow-auto">
        <div className="flex justify-end">
          <button id="close-modal-container" onClick={onClose}>X
          </button>
        </div>
        <form onSubmit={handleSubmit} className="form w-full">
          <p className="mb-4">Please select which type of issue you are experiencing.</p>
          <div className="grid gap-10 grid-cols-3 text-xs mb-6 mx-auto text-center w-5/6 ">
              {ticketTopics.map( (topic, index) => (
                  <div key={index} 
                  onClick={() => setSelectedTopic(topic.title)} 
                  className="col-span-1">
                    <img 
                    src={topic.icon} 
                    alt="issue" 
                    className={`${selectedTopic === topic.title ? "outline-blue-600 outline-4" : "outline-black outline-2"} outline rounded-md p-2 mb-2`}
                    />
                    <h1 className="underline"><b>{topic.title}</b></h1>
                    <p className="bg-slate-200 rounded-md p-2">{topic.desc}</p>
                  </div>
              ))}
          </div>
          <hr />
            <div className="my-6">
              <label className="block mb-2">Subject
              </label>
              <input value={subject} onChange={(e) => setSubject(e.target.value)} type="text" required id="ticketSubject" className="flex items-center h-12 px-4 w-2/3 bg-gray-200 rounded-md focus:outline-none focus:ring-2" placeholder="Give your issue a meaningful subject"/>
            </div>

            <div className="my-6">
              <label className="block mb-2">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} required id="ticketDesc" placeholder="Describe the issue you are having in detail" className="flex items-center h-36 p-4 w-full bg-gray-200 rounded-md focus:outline-none focus:ring-2"></textarea>
            </div>
            
            <div className="my-6">
              <label className="block mb-2">If you can, provide screenshots and pictures that may help us resolve your issue</label>
              <div className="outline-1 outline-black outline-dashed rounded-md h-48 flex justify-center place-items-center bg-gray-200 text-center relative">
                <input onChange={(e) => setFiles(Array.from(e.target.files))} type="file" multiple className="opacity-0 w-full h-full z-50" name="userPictures"/>
                  <p className="absolute text-xs">drag and drop your files here<br /> or <br />select files from your device</p>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button type="submit" className="bg-green-600 rounded-2xl w-20 mt-2 pb-0.5">Submit</button>
            </div>
        </form>
      </div>
    </div>
  )
};
