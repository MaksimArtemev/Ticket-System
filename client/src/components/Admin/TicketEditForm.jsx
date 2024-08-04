import React from 'react';

const TicketEditForm = ({onClose, visible, ticket}) => {
    if(!visible) return null;
    return(
        <div id="close-ticketEdit-container" onClick={onClose} className="h-full w-full absolute bg-black bg-opacity-30 backdrop-blur-sm flex justify-center place-items-center z-40">
            <div className="flex justify-end">
            <button id="close-ticketEdit-container" onClick={onClose}>X</button>
            </div>
            <div className="bg-white py-3 px-6 rounded w-2/3 h-full overflow-y-auto">
                You are currently editing ticket id: {ticket.ticketID}
            </div>
        </div>
    )
};

export default TicketEditForm;