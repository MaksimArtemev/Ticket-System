import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button } from "@mui/material";

const AdminTicketEditForm = ({ ticket }) => {
  const [employeeId, setEmployeeId] = useState(ticket.assignedEmployee || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token');
    try {
      await axios.put(
        `http://localhost:4000/api/admin/assign-ticket/${ticket._id}`,
        { employeeId },
        { headers: { 'x-auth-token': token } }
      );
      alert('Ticket assignment updated successfully');
    } catch (error) {
      console.error('Error updating ticket assignment:', error);
      alert('Failed to update ticket assignment');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} m="20px">
      <TextField
        label="Assign Employee"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Update
      </Button>
    </Box>
  );
};

export default AdminTicketEditForm;
