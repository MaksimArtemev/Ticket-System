import React, { useState, useEffect } from 'react';
import TicketsTable from './TicketsTable';
console.log('Yoo im from user mainpage');
const TicketsPage = ({ onRowClick }) => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('Yoo im from user mainpage');
        const fetchTickets = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found in localStorage');
                    return;
                }

                console.log('Fetching tickets with token:', token);

                const response = await fetch('http://localhost:4000/api/tickets/user-tickets', {
                    headers: {
                        'x-auth-token': token,
                    },
                });

                console.log('Response Status:', response.status);

                if (!response.ok) {
                    const errorResponse = await response.json();
                    console.error('Error Response:', errorResponse);
                    throw new Error(`HTTP error! status: ${response.status}, message: ${errorResponse.message}, stack: ${errorResponse.stack}`);
                }

                const data = await response.json();
                console.log('Fetched Tickets:', data);
                setTickets(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching tickets:', error.message);
                console.error('Error stack:', error.stack);
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="h-full">
                <TicketsTable tickets={tickets} onRowClick={onRowClick} />
            </div>
        </div>
    );
};

export default TicketsPage;
