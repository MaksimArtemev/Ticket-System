import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TicketEditForm.css'; // Ensure your CSS file is imported

const TicketEditForm = ({ onClose, visible, ticket, isAdmin }) => {
  const [status, setStatus] = useState(ticket.status);
  const [employees, setEmployees] = useState([]);
  const [assignedEmployee, setAssignedEmployee] = useState(ticket.assignedEmployee?._id || '');

  useEffect(() => {
    const fetchEmployees = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:4000/api/admin/all-employees', {
          headers: { 'x-auth-token': token },
        });
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    if (isAdmin) {
      fetchEmployees();
    }
  }, [isAdmin]);

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    try {
      const selectedEmployee = employees.find(emp => emp._id === assignedEmployee);
      const data = {
        status,
        assignedEmployee: selectedEmployee ? {
          _id: selectedEmployee._id,
          firstName: selectedEmployee.firstName,
          lastName: selectedEmployee.lastName
        } : {
          _id: null,
          firstName: 'Not declared',
          lastName: ''
        }
      };
      
      await axios.put(`http://localhost:4000/api/admin/update-ticket-status/${ticket._id}`, data, {
        headers: { 'x-auth-token': token },
      });

      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Failed to update ticket status:', error);
      window.location.reload();
    }
  };

  if (!visible) return null;

  return (
    <div id="close-ticketEdit-container" onClick={onClose} className="modal">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Edit Ticket</h2>
        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </label>
        {isAdmin && (
          <label>
            Assign to:
            <select value={assignedEmployee} onChange={(e) => setAssignedEmployee(e.target.value)}>
              <option value="">Not declared</option>
              {employees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.firstName} {employee.lastName}
                </option>
              ))}
            </select>
          </label>
        )}
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default TicketEditForm;
