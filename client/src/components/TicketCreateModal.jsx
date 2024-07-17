import React, { useState } from 'react'
import ticketIssue0 from "../assets/ticket-issue-0.png"
import ticketIssue1 from "../assets/ticket-issue-1.png"
import ticketIssue2 from "../assets/ticket-issue-2.png"

export default function TicketCreationModal({visible, onClose}) {
    const [selectedIssue, setSelectedIssue] = useState(0);
    if(!visible) return null;
    return (
      <div id="close-modal-container" onClick={onClose} className="h-screen w-screen absolute bg-black bg-opacity-30 backdrop-blur-sm flex justify-center place-items-center">
        <div className="bg-white p-5 rounded w-1/2 h-auto">
          <form action="#">
            <p className="pb-2">Please select which type of issue you are experiencing.</p>
            <div className="inline-grid gap-11 grid-cols-3 grid-rows-1">
              
              <div onClick={() => setSelectedIssue(0)} className="col-span-1" >
                <img src={ticketIssue0} alt="hardware issue" className={`${selectedIssue == 0 ? "border-blue-600" : "border-white"} border-2`}/>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>

              <div onClick={() => setSelectedIssue(1)} className="col-span-1">
                <img src={ticketIssue1} alt="internet issue" className={`${selectedIssue == 1 ? "border-blue-600" : "border-white"} border-2`}/>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>

              <div onClick={() => setSelectedIssue(2)} className="col-span-1">
                <img src={ticketIssue2} alt="internet issue" className={`${selectedIssue == 2 ? "border-blue-600" : "border-white"} border-2`}/>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
            </div>
              <div className="py-2">
              <label htmlFor="subject" className="block my-2">Subject</label>
              <input type="text" name="subject" id="ticketSubject" className="block size-1/2" placeholder="Please input the subject of your issue"/>
              </div>

              <div className="py-2">
              <label htmlFor="description" className="block my-2">Description</label>
              <textarea name="description" id="ticketDesc" placeholder="Please describe the issue you are having" className="block w-full" ></textarea>
              </div>

          </form>
          <button id="close-modal-container"onClick={onClose}>X</button>
        </div>
      </div>
    )
};
