import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TicketsTableAdmin from './TicketsTableAdmin';
import AdminTicketEditForm from './AdminTicketEditForm';
import { Box, Button } from "@mui/material";
console.log('Yoo im from Admins mainpage');

const TicketsPageAdmin = ({ onRowClick }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    console.log('Yoo im from Admins mainpage');
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token); // Log the token
        if (!token) {
          console.error('No token found in localStorage');
          return;
        }

        const response = await axios.get('http://localhost:4000/api/admin/all-tickets', {
          headers: { 'x-auth-token': token },
        });
        console.log('Response:', response); // Log the response
        setTickets(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const handleEdit = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleCreateEmployee = () => {
    // Handle create employee logic
  };

  const handleDeleteEmployee = () => {
    // Handle delete employee logic
  };

  const handleAssignAvailability = () => {
    // Handle assign availability logic
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Box m="20px">
        <Box display="flex" justifyContent="space-between" mb="20px">
          <Button variant="contained" color="primary" onClick={handleCreateEmployee}>
            Create Employee
          </Button>
          <Button variant="contained" color="secondary" onClick={handleDeleteEmployee}>
            Delete Employee
          </Button>
          <Button variant="contained" color="default" onClick={handleAssignAvailability}>
            Assign Availability
          </Button>
        </Box>
        <div className="h-full">
          <TicketsTableAdmin tickets={tickets} onRowClick={handleEdit} />
        </div>
        {selectedTicket && <AdminTicketEditForm ticket={selectedTicket} />}
      </Box>
    </div>
  );
};

export default TicketsPageAdmin;
