import React from 'react';
import TicketsTableAdmin from './TicketsTableAdmin';
import TicketEditForm from './TicketEditForm';

const TicketsPageAdmin = ({onRowClick}) => {   


    return (
        <div>
            <div>
            Tickets Record
            </div>
            <TicketsTableAdmin onClick={onRowClick}/>
        </div>
    )
};

export default TicketsPageAdmin;