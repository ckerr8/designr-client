import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from '../../../api';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';

export default function ClientsDetail() {
    const { idFromParams } = useParams(); // Correct usage of useParams
    const [client, setClient] = useState(null); // Initialize as null for a single client
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchClient();
    }, [idFromParams]); // Add dependency to prevent infinite re-renders

    const fetchClient = async () => {
        try {
            const response = await api.get(`/clients/${idFromParams}`);
            setClient(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch client');
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!client) return <div>No client data found</div>;

    return (
        <div className='main-contain'>
            <Card className='main-contain__item' sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="160"
                        image={client.remote_url}
                        alt={client.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {client.contact_name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {client.category}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
}