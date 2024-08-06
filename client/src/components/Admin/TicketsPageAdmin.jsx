<<<<<<< HEAD
import React from 'react';
import TicketsTableAdmin from './TicketsTableAdmin';
import TicketEditForm from './AdminTicketEditForm';

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
=======
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TicketsTableAdmin from './TicketsTableAdmin';

const TicketsPageAdmin = ({ onRowClick }) => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:4000/api/admin/all-tickets', {
          headers: { 'x-auth-token': token },
        });
        const ticketsWithAssignedEmployeeDetails = await Promise.all(
          response.data.map(async (ticket) => {
            if (ticket.assignedEmployee) {
              const employeeResponse = await axios.get(`http://localhost:4000/api/admin/employee/${ticket.assignedEmployee}`, {
                headers: { 'x-auth-token': token },
              });
              ticket.assignedEmployee = employeeResponse.data;
            }
            return ticket;
          })
        );
        setTickets(ticketsWithAssignedEmployeeDetails);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div>
      <h1>All Tickets</h1>
      <TicketsTableAdmin tickets={tickets} onRowClick={onRowClick} />
    </div>
  );
};

export default TicketsPageAdmin;
>>>>>>> main
