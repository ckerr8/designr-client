import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from '../../../api';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';

export default function Tasks({ projectId }) {
    const { idFromParams } = useParams();
    const taskProject = projectId || idFromParams;
    
    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        if (!taskProject) return;

        const fetchProjectWithTasks = async () => {
            try {
                const response = await api.get(`/projects/${taskProject}`);
                setProject(response.data);
                setTasks(response.data.tasks);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch project and tasks');
                setLoading(false);
            }
        };

        fetchProjectWithTasks();
    }, [taskProject]);
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!project) return <div>No project found</div>;
  
    return (
        <div className='main-contain'>
            <h2>{project.name}</h2> {/* Display project name */}
            {tasks.length === 0 ? (
                <p>No tasks for this project</p>
            ) : (
                tasks.map((task) => (
                    <Card key={task.id} className='main-contain__item' sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="160"
                                alt={task.title}
                                image={task.image_url} // Add this if you have an image URL for the task
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {task.title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {task.description}
                                </Typography>
                                <Typography variant="body2">
                                    Status: {task.status}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))
            )}
        </div>
    );
}