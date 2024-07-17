import React, { useState } from 'react'
import ticketIssue0 from "../assets/ticket-issue-0.png"
import ticketIssue1 from "../assets/ticket-issue-1.png"
import ticketIssue2 from "../assets/ticket-issue-2.png"
import ticketIssue3 from "../assets/ticket-issue-3.png"
import ticketIssue4 from "../assets/ticket-issue-4.png"
import ticketIssue5 from "../assets/ticket-issue-5.png"

export default function TicketCreationForm({visible, onClose}) {
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [files, setFiles] = useState();

    const ticketTopics = [
      { topic: "Repair", desc: "some description idk", icon: ticketIssue5},
      { topic: "Account", desc: "some description idk", icon: ticketIssue2},
      { topic: "Product", desc: "some description idk", icon: ticketIssue4},
      { topic: "Billing", desc: "some description idk", icon: ticketIssue3},
      { topic: "Hardware", desc: "some description idk", icon: ticketIssue0},
      { topic: "Software", desc: "some description idk", icon: ticketIssue1},
    ]

    if(!visible) return null;
    return (
      <div id="close-modal-container" onClick={onClose} className="h-screen w-screen absolute bg-black bg-opacity-30 backdrop-blur-sm flex justify-center place-items-center z-40">
        <div className="bg-white py-3 px-6 rounded w-4/5 h-full overflow-y-auto">
          <div className="flex justify-end">
            <button id="close-modal-container" onClick={onClose}>X</button>
          </div>
          <form action="#" className="w-full ">
            <p className="mb-4">Please select which type of issue you are experiencing.</p>
            <div className="grid gap-10 grid-cols-3 grid-rows-1 text-xs mb-6 mx-auto text-center w-4/5 ">

              {/* {ticketTopics.map( (topic) => {
                <div onClick={() => setSelectedTopic(topic.topic)} className="col-span-1" >
                  <img src={topic.icon} alt="hardware issue" className={`${selectedTopic === topic.topic ? "border-blue-600" : "border-white"} border-2 `}/>
                  <h1 className="underline">{topic.topic}</h1>
                  <p>{topic.desc}</p>
                </div>
              })} */}

              <div onClick={() => setSelectedTopic(0)} className="col-span-1" >
                <img src={ticketIssue0} alt="hardware issue" className={`${selectedTopic === 0 ? "outline-blue-600 outline-4" : "outline-black outline-2"} outline rounded-md p-2 mb-2`}/>
                <h1 className="underline"><b>Hardware</b></h1>
                <p className="bg-slate-200 rounded-md p-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>

              <div onClick={() => setSelectedTopic(1)} className="col-span-1">
                <img src={ticketIssue1} alt="internet issue" className={`${selectedTopic === 1 ? "outline-blue-600 outline-4" : "outline-black outline-2"} outline rounded-md p-2 mb-2`}/>
                <h1 className="underline"><b>Software</b></h1>
                <p className="bg-slate-200 rounded-md p-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>

              <div onClick={() => setSelectedTopic(2)} className="col-span-1">
                <img src={ticketIssue2} alt="internet issue" className={`${selectedTopic === 2 ? "outline-blue-600 outline-4" : "outline-black outline-2"} outline rounded-md p-2 mb-2`}/>
                <h1 className="underline"><b>Account</b></h1>
                <p className="bg-slate-200 rounded-md p-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>

              <div onClick={() => setSelectedTopic(3)} className="col-span-1" >
                <img src={ticketIssue3} alt="hardware issue" className={`${selectedTopic === 3 ? "outline-blue-600 outline-4" : "outline-black outline-2"} outline rounded-md p-2 mb-2`}/>
                <h1 className="underline"><b>Billing</b></h1>
                <p className="bg-slate-200 rounded-md p-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>

              <div onClick={() => setSelectedTopic(4)} className="col-span-1">
                <img src={ticketIssue4} alt="internet issue" className={`${selectedTopic === 4 ? "outline-blue-600 outline-4" : "outline-black outline-2"} outline rounded-md p-2 mb-2`}/>
                <h1 className="underline"><b>Product</b></h1>
                <p className="bg-slate-200 rounded-md p-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>

              <div onClick={() => setSelectedTopic(5)} className="col-span-1">
                <img src={ticketIssue5} alt="internet issue" className={`${selectedTopic === 5 ? "outline-blue-600 outline-4" : "outline-black outline-2"} outline rounded-md p-2 mb-2`}/>
                <h1 className="underline"><b>Repair</b></h1>
                <p className="bg-slate-200 rounded-md p-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
            </div>
            <hr />
              <div className="py-2">
              <label htmlFor="subject" className="block my-2">Subject</label>
              <input type="text" required name="subject" id="ticketSubject" className="flex items-center h-12 px-4 w-2/3 bg-gray-200 mt-2 rounded-md focus:outline-none focus:ring-2" placeholder="Give your issue a meaningful subject"/>
              </div>

              <div className="py-2">
              <label htmlFor="description" className="block my-2">Description</label>
              <textarea name="description" required id="ticketDesc" placeholder="Describe the issue you are having in detail" className="flex items-center h-36 p-4 w-full bg-gray-200 mt-2 rounded-md focus:outline-none focus:ring-2"></textarea>
              </div>

              <label htmlFor="userPictures" className="block my-2">Please upload any screenshots or pictures of your issue that may help us</label>
              <div className="border border-black border-dashed rounded-md h-48 flex justify-center place-items-center bg-gray-200 text-center relative">
                <input type="file" multiple className="opacity-0 w-full h-full z-50" name="userPictures"/>
                <div className="absolute text-xs">
                  <p>drag and drop your files here <br /> or <br /> select files from your device</p>
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <button type="submit" className="bg-green-600 rounded-2xl w-20 mt-2 pb-0.5">submit</button>
              </div>
          </form>
        </div>
      </div>
    )
};
