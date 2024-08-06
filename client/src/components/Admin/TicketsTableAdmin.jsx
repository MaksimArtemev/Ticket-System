import React from 'react';
import { Box, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import { useSelector } from 'react-redux';

const Team = ({ onRowClick }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const tickets = useSelector((state) => state.tickets); // Assuming you are using Redux to manage state

    const columns = [
        { field: "id", headerName: "Ticket ID", flex: 1 },
        { field: "userID", headerName: "User ID", flex: 1 },
        { field: "employeeID", headerName: "Employee ID", flex: 1 },
        { field: "type", headerName: "Type", flex: 1 },
        { field: "subject", headerName: "Subject", flex: 1 },
        { field: "description", headerName: "Description", flex: 1 },
        { field: "status", headerName: "Status", flex: 1 },
        { field: "role", headerName: "Role", flex: 1 }, // Added Role column
        {
            field: "assignedEmployee",
            headerName: "Assigned Employee",
            flex: 1,
            valueGetter: (params) => {
                const employee = params.row.assignedEmployee;
                return employee && employee.firstName && employee.lastName ? `${employee.firstName} ${employee.lastName}` : 'Unassigned';
            },
        },
    ];

    return (
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
                <DataGrid rows={tickets} columns={columns} onRowClick={onRowClick} getRowId={(row) => row._id} />
            </Box>
        </Box>
    );
};

export default Team;
