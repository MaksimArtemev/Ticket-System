import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TicketEditForm = ({ onClose, visible, ticket }) => {
    const [status, setStatus] = useState(ticket.status);

    useEffect(() => {
        setStatus(ticket.status);
    }, [ticket]);

    if (!visible) return null;

    const handleSave = async () => {
        console.log(ticket._id);
        console.log("!!!!!!!!");
        console.log(`Updating ticket with ID: ${ticket._id}, Status: ${status}`);
        try {
            const response = await axios.put(`http://localhost:4000/api/admin/update-ticket-status/${ticket._id}`, { status }, {
                headers: { 'x-auth-token': localStorage.getItem('token') },
            });

            if (response.status === 200) {
                onClose(); // Close the modal on success
                window.location.reload(); // Refresh the page
            }
        } catch (error) {
            window.location.reload(); // Refresh the page
            console.error('Failed to update ticket status:', error);
        }
    };

    return (
        <div id="close-ticketEdit-container" onClick={onClose} className="h-full w-full absolute bg-black bg-opacity-30 backdrop-blur-sm flex justify-center place-items-center z-40">
            <div className="flex justify-end">
                <button id="close-ticketEdit-container" onClick={onClose}>X</button>
            </div>
            <div className="bg-white py-3 px-6 rounded w-2/3 h-full overflow-y-auto">
                <h2>You are currently editing ticket id: {ticket._id}</h2>
                <div>
                    <label>Status</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="open">Open</option>
                        <option value="in-progress">In Progress</option>
                        <option value="closed">Closed</option>
                    </select>
                </div>
                <button onClick={handleSave}>Save</button>
            </div>
        </div>
    );
};

export default TicketEditForm;
