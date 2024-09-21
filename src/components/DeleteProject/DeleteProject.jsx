import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress
} from '@mui/material';
import api from '../../api'; 

export default function DeleteProject({ open, onDelete }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchProject = async () => {
        try {
          const response = await api.get(`/projects/${id}`);
          setProject(response.data);
          setLoading(false);
        } catch (err) {
          console.error('Error fetching project:', err);
          setError('Failed to load project details');
          setLoading(false);
        }
      };
  
      fetchProject();
    }, [id]);
  
    const handleDelete = async () => {
        try {
          await api.delete(`/projects/${project.id}`);
          onDelete(); // Re-fetch projects
          handleClose(); // Close the modal
        } catch (err) {
          console.error('Error deleting project:', err);
          setError('Failed to delete project. Please try again.');
        }
      };
  
    const handleClose = () => {
      navigate('/projects');
    };
  
    if (loading) {
      return <CircularProgress />;
    }
  
    if (error) {
      return <Typography color="error">{error}</Typography>;
    }
  
    return (
        <Dialog open={open} onClose={handleClose}>
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
            {project.tasks && project.tasks.length > 0 && (
              <Typography variant="body2" color="error">
                Warning: This project has {project.tasks.length} associated task(s).
                Deleting this project will update these tasks to 'Unassigned' status.
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  }