import React, { useState } from 'react'
import ticketIssue0 from "../assets/ticket-issue-0.png"
import ticketIssue1 from "../assets/ticket-issue-1.png"
import ticketIssue2 from "../assets/ticket-issue-2.png"
import ticketIssue3 from "../assets/ticket-issue-3.png"
import ticketIssue4 from "../assets/ticket-issue-4.png"
import ticketIssue5 from "../assets/ticket-issue-5.png"

export default function TicketCreationModal({visible, onClose}) {
    const [selectedIssue, setSelectedIssue] = useState(null);
    if(!visible) return null;
    return (
      <div id="close-modal-container" onClick={onClose} className="h-screen w-screen absolute bg-black bg-opacity-30 backdrop-blur-sm flex justify-center place-items-center">
        <div className="bg-white py-3 px-6 rounded w-3/5 h-full overflow-y-auto">
          <div className="flex justify-end">
          <button id="close-modal-container" onClick={onClose}>X</button>
          </div>
          <form action="#">

            <p>Please select which type of issue you are experiencing.</p>
            
            <div className="grid gap-10 grid-cols-3 grid-rows-1 text-xs w-3/4 m-auto text-center">
              <div onClick={() => setSelectedIssue(0)} className="col-span-1" >
                <img src={ticketIssue0} alt="hardware issue" className={`${selectedIssue === 0 ? "border-blue-600" : "border-white"} border-2 `}/>
                <h1 className="underline">Hardware</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>

              <div onClick={() => setSelectedIssue(1)} className="col-span-1">
                <img src={ticketIssue1} alt="internet issue" className={`${selectedIssue === 1 ? "border-blue-600" : "border-white"} border-2`}/>
                <h1 className="underline">Software</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>

              <div onClick={() => setSelectedIssue(2)} className="col-span-1">
                <img src={ticketIssue2} alt="internet issue" className={`${selectedIssue === 2 ? "border-blue-600" : "border-white"} border-2`}/>
                <h1 className="underline">Account</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>

              <div onClick={() => setSelectedIssue(3)} className="col-span-1" >
                <img src={ticketIssue3} alt="hardware issue" className={`${selectedIssue === 3 ? "border-blue-600" : "border-white"} border-2`}/>
                <h1 className="underline">Billing</h1>
                <p className="text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>

              <div onClick={() => setSelectedIssue(4)} className="col-span-1">
                <img src={ticketIssue4} alt="internet issue" className={`${selectedIssue === 4 ? "border-blue-600" : "border-white"} border-2`}/>
                <h1 className="underline">Product</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>

              <div onClick={() => setSelectedIssue(5)} className="col-span-1">
                <img src={ticketIssue5} alt="internet issue" className={`${selectedIssue === 5 ? "border-blue-600" : "border-white"} border-2`}/>
                <h1 className="underline">Repair</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>

            </div>
              <div className="py-2">
              <label htmlFor="subject" className="block my-2">Subject</label>
              <input type="text" name="subject" id="ticketSubject" className="flex items-center h-12 px-4 w-full bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" placeholder="Please input the subject of your issue"/>
              </div>

              <div className="py-2">
              <label htmlFor="description" className="block my-2">Description</label>
              <textarea name="description" id="ticketDesc" placeholder="Please describe the issue you are having" className="flex items-center h-36 p-4 w-full bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"></textarea>
              </div>
              <div className="flex justify-center">
                <button type="submit" className="bg-green-600 rounded-2xl w-20 mt-2 pb-0.5">submit</button>
              </div>
          </form>
        </div>
      </div>
    )
};
