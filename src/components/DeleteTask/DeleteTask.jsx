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

export default function DeleteTask({ open, onDelete }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, settask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchtask = async () => {
        try {
          const response = await api.get(`/tasks/${id}`);
          settask(response.data);
          setLoading(false);
        } catch (err) {
          console.error('Error fetching task:', err);
          setError('Failed to load task details');
          setLoading(false);
        }
      };
  
      fetchtask();
    }, [id]);
  
    const handleDelete = async () => {
        try {
          await api.delete(`/tasks/${task.id}`);
          onDelete(); // Re-fetch tasks
          handleClose(); // Close the modal
        } catch (err) {
          console.error('Error deleting task:', err);
          setError('Failed to delete task. Please try again.');
        }
      };
  
    const handleClose = () => {

    };
  
    if (loading) {
      return <CircularProgress />;
    }
  
    if (error) {
      return <Typography color="error">{error}</Typography>;
    }
  
    return (
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete task</DialogTitle>
        <DialogContent>
          <Box sx={{ m: 2 }}>
            <Typography variant="body1" gutterBottom>
              Are you sure you want to delete the following task?
            </Typography>
            <Typography variant="body2">
              <strong>task Name:</strong> {task.task_name}
            </Typography>
            <Typography variant="body2">
              <strong>Description:</strong> {task.description}
            </Typography>
            <Typography variant="body2">
              <strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}
            </Typography>
            {task.tasks && task.tasks.length > 0 && (
              <Typography variant="body2" color="error">
                Warning: This task has {task.tasks.length} associated task(s).
                Deleting this task will update these tasks to 'Unassigned' status.
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