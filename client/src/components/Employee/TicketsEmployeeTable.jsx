import React, { useEffect, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { tokens } from '../theme'; // Adjust the path as necessary


const Team = ({ onClick, isAdmin }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:4000/api/tickets/user-tickets', {
          headers: { 'x-auth-token': token },
        });
        setTickets(response.data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  const columns = [
    { field: "id", headerName: "Ticket ID" },
    { field: "userID", headerName: "User ID" },
    { field: "employeeID", headerName: "Employee ID" },
    {
      field: "type",
      headerName: "Type",
    },
    {
      field: "subject",
      headerName: "Subject",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
    },
    ...(isAdmin ? [{
      field: "assignedEmployee",
      headerName: "Assigned Employee",
      flex: 1,
      valueGetter: (params) => {
        console.log('Params:', params); // Log params to debug
        const employee = params.row.assignedEmployee;
        if (!employee || !employee.firstName) return 'Not declared';
        return `${employee.firstName} ${employee.lastName}`;
      },
    }] : []), // Only add this column if the user is an admin
  ];
  

  return (
    <div>
      <Box m="20px">
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
          <DataGrid
            rows={tickets}
            columns={columns}
            onRowClick={onClick}
            getRowId={(row) => row._id} // Specify the unique identifier for each row
          />
        </Box>
      </Box>
    </div>
  );
};

export default Team;
