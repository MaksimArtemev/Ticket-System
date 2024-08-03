import React, { useState } from 'react';
import ticketIssue0 from '../../assets/ticket-issue-0.png';
import ticketIssue1 from '../../assets/ticket-issue-1.png';
import ticketIssue2 from '../../assets/ticket-issue-2.png';
import ticketIssue3 from '../../assets/ticket-issue-3.png';
import ticketIssue4 from '../../assets/ticket-issue-4.png';
import ticketIssue5 from '../../assets/ticket-issue-5.png';

export default function TicketCreationForm({ visible, onClose }) {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);

  const ticketTopics = [
    { topic: "Repair", desc: "Issues related to hardware or software repairs. Please describe the problem and any relevant details.", icon: ticketIssue5 },
    { topic: "Account", desc: "Problems with your account, such as login issues, password resets, or account settings.", icon: ticketIssue2 },
    { topic: "Product", desc: "Inquiries or problems related to products, including product defects, usage questions, or returns.", icon: ticketIssue4 },
    { topic: "Billing", desc: "Questions or issues related to billing, such as incorrect charges, payment problems, or invoice requests.", icon: ticketIssue3 },
    { topic: "Hardware", desc: "Issues specific to hardware components, such as malfunctioning devices, connectivity issues, or hardware upgrades.", icon: ticketIssue0 },
    { topic: "Software", desc: "Software-related problems, including installation issues, bugs, or software updates.", icon: ticketIssue1 },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('Form submitted'); // Debugging statement
  console.log('Selected topic:', selectedTopic); // Debugging statement
  console.log('Subject:', subject); // Debugging statement
  console.log('Description:', description); // Debugging statement


    const formData = new FormData();
    formData.append('topic', selectedTopic);
    formData.append('subject', subject);
    formData.append('description', description);
    files.forEach(file => formData.append('files', file));
    console.log('Form data:', formData); // Debugging statement


    try {
      const token = localStorage.getItem('token'); // Retrieve the JWT token from local storage
      console.log('Token:', token); // Debugging statement


       const response = await fetch('http://localhost:4000/api/tickets', {
        method: 'POST',
        headers: {
          'x-auth-token': token // Include the token in the request headers
        },
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Ticket created with ID:', data.ticketID);
        // Optionally, reset the form or provide feedback to the user
        // Redirect to the main page or chat system
        window.location.href = "/main"; // Adjust the URL as needed
      } else {
        console.error('Error creating ticket:', data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);

    const previews = selectedFiles.map(file => URL.createObjectURL(file));
    setFilePreviews(previews);
  };

  if (!visible) return null;
  return (
    <div id="close-modal-container" onClick={onClose} className="h-screen w-screen absolute bg-black bg-opacity-30 backdrop-blur-sm flex justify-center place-items-center z-40">
      <div className="bg-white py-3 px-6 rounded w-4/5 h-full overflow-y-auto">
        <div className="flex justify-end">
          <button id="close-modal-container" onClick={onClose}>X</button>
        </div>
        <form onSubmit={handleSubmit} className="w-full">
          <p className="mb-4">Please select which type of issue you are experiencing.</p>
          <div className="grid gap-10 grid-cols-3 grid-rows-1 text-xs mb-6 mx-auto text-center w-5/6">
            {ticketTopics.map((topic, index) => (
              <div
                key={index}
                onClick={() => setSelectedTopic(topic.topic)}
                className={`col-span-1 cursor-pointer p-2 mb-2 rounded-md ${selectedTopic === topic.topic ? 'bg-blue-100 border-2 border-blue-600' : 'border-2 border-gray-200'}`}
              >
                <img src={topic.icon} alt={topic.topic} className="mb-2"/>
                <h1 className="underline"><b>{topic.topic}</b></h1>
                <p className="bg-slate-200 rounded-md p-2">{topic.desc}</p>
              </div>
            ))}
          </div>
          <hr />
          <div className="my-6">
            <label htmlFor="subject" className="block mb-2">Subject</label>
            <input type="text" required name="subject" id="ticketSubject" value={subject} onChange={(e) => setSubject(e.target.value)} className="flex items-center h-12 px-4 w-2/3 bg-gray-200 rounded-md focus:outline-none focus:ring-2" placeholder="Give your issue a meaningful subject" />
          </div>
          <div className="my-6">
            <label htmlFor="description" className="block mb-2">Description</label>
            <textarea name="description" required id="ticketDesc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the issue you are having in detail" className="flex items-center h-36 p-4 w-full bg-gray-200 rounded-md focus:outline-none focus:ring-2"></textarea>
          </div>
          <div className="my-6">
            <label htmlFor="userPictures" className="block mb-2">Please upload any screenshots or pictures of your issue that may help us</label>
            <div className="outline-1 outline-black outline-dashed rounded-md h-48 flex justify-center place-items-center bg-gray-200 text-center relative">
              <input type="file" multiple onChange={handleFileChange} className="opacity-0 w-full h-full z-50" name="userPictures" />
              <p className="absolute text-xs">drag and drop your files here <br /> or <br /> select files from your device</p>
            </div>
            <div className="mt-4">
              {filePreviews.map((preview, index) => (
                <img key={index} src={preview} alt={`preview ${index}`} className="inline-block h-24 mr-2 rounded-md" />
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <button type="submit" className="bg-green-600 rounded-2xl w-20 mt-2 pb-0.5">submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
