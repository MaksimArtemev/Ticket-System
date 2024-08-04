import React, { useState, useEffect } from 'react';
import TicketsTable from './TicketsTable';

const TicketsPage = ({ onRowClick }) => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found in localStorage');
                    return;
                }

                const response = await fetch('http://localhost:4000/api/tickets/user-tickets', {
                    headers: {
                        'x-auth-token': token,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setTickets(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching tickets:', error.message);
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
