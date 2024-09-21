import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from '../../../api';
import { 
  Card, CardActionArea, CardMedia, CardContent, Typography, 
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ProjectDetails() {
    const { idFromParams } = useParams();
    const navigate = useNavigate();
    
    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  
    useEffect(() => {
        if (!idFromParams) return;

        const fetchProjectWithTasks = async () => {
            try {
                const response = await api.get(`/projects/${idFromParams}`);
                setProject(response.data);
                setTasks(response.data.tasks || []);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch project and tasks');
                setLoading(false);
            }
        };

        fetchProjectWithTasks();
    }, [idFromParams]);

    const handleOpenDeleteModal = () => {
        setDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setDeleteModalOpen(false);
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/projects/${idFromParams}`);
            handleCloseDeleteModal();
            navigate('/projects', { state: { message: 'Project deleted successfully' } });
        } catch (err) {
            console.error('Error deleting project:', err);
            setError('Failed to delete project. Please try again.');
        }
    };
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!project) return <div>No project found</div>;
  
    return (
        <div className='main-contain'>
            <h2>{project.project_name}</h2>
            <Button 
                startIcon={<DeleteIcon />} 
                color="error" 
                onClick={handleOpenDeleteModal}
            >
                Delete Project
            </Button>
            <Typography variant="body1">Description: {project.description}</Typography>
            <Typography variant="body1">Deadline: {new Date(project.deadline).toLocaleDateString()}</Typography>
            <Typography variant="body1">Price: ${project.price}</Typography>
            <Typography variant="h4" sx={{ mt: 4 }}>Tasks</Typography>
            {tasks.length === 0 ? (
                <div>
                <p>No tasks for this project</p>
                <Button 
                startIcon={<DeleteIcon />} 
                color="error" 
                onClick={handleOpenDeleteModal}
            >
                Delete Project
            </Button>
            </div>
            ) : (
                tasks.map((task) => (
                    <Card key={task.id} className='main-contain__item' sx={{ maxWidth: 345, mt: 2 }}>
                        <CardActionArea>
                            {task.image_url && (
                                <CardMedia
                                    component="img"
                                    height="160"
                                    alt={task.title}
                                    image={task.image_url}
                                />
                            )}
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

            <Dialog open={deleteModalOpen} onClose={handleCloseDeleteModal}>
                <DialogTitle>Delete Project</DialogTitle>
                <DialogContent>
                    <Box sx={{ m: 2 }}>
                        <Typography variant="body1" gutterBottom>
                            Are you sure you want to delete the following project?
                        </Typography>
                        <Typography variant="body2">
                            <strong>Project Name:</strong> {project.project_name}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Description:</strong> {project.description}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Deadline:</strong> {new Date(project.deadline).toLocaleDateString()}
                        </Typography>
                        {tasks.length > 0 && (
                            <Typography variant="body2" color="error">
                                Warning: This project has {tasks.length} associated task(s).
                                Deleting this project will update these tasks to 'Unassigned' status.
                            </Typography>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteModal} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}