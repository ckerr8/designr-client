import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from '../../api';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';

export default function TasksDetail() {
    const { idFromParams } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!idFromParams) return;

        const fetchTask = async () => {
            try {
                const response = await api.get(`/tasks/${idFromParams}`);
                if (response.data) {
                    setTask(response.data);
                } else {
                    setError('No task found');
                }
            } catch (err) {
                console.error("Error fetching task:", err);
                setError('Failed to fetch task');
            } finally {
                setLoading(false);
            }
        };

        fetchTask();
    }, [idFromParams]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='main-contain'>
            <h2>{task.category}</h2>
            <Card className='main-contain__item' sx={{ maxWidth: 345, mt: 2 }}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {task.category}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Quantity: {task.quantity}
                        </Typography>
                        <Typography variant="body2">
                            Status: {task.status}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
}