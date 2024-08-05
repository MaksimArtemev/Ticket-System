import React from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";


const TicketsTableAdmin = ({ tickets, onRowClick }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        { field: "_id", headerName: "Ticket ID" },
        { field: "userId", headerName: "User ID" },
        {
            field: "topic",
            headerName: "Type",
        },
        {
            field: "role",
            headerName: "Role", // Adding Role here
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
        {
            field: "assignedEmployee",
            headerName: "Assigned Employee",
        },
        {
            field: "actions",
            headerName: "Actions",
            renderCell: (params) => (
                <button onClick={() => onRowClick(params.row)}>Edit</button>
            ),
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
                <DataGrid 
                    checkboxSelection 
                    rows={tickets} 
                    columns={columns} 
                    getRowId={(row) => row._id} 
                />
            </Box>
        </Box>
    );
};

export default TicketsTableAdmin;
