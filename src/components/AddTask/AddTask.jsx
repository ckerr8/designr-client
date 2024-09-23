import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from '../../api';

import {
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';

export default function AddTask({ open, handleClose, onAssetCreated }) {
  const navigate = useNavigate();
  const { idFromParams } = useParams(); // Get project ID from route parameters
  const [newTask, setNewTask] = useState({
    category: '',
    status: 'active',
    quantity: 1,
    task_name: '',
    description: ''
  });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      // Include project ID in task data
      const taskData = { ...newTask, projects_id: idFromParams };
      // Ensure correct endpoint for creating a task
      const response = await api.post(`/projects/${idFromParams}`, taskData); 
      onAssetCreated(response.data);
      handleClose();
    } catch (err) {
      console.error('Failed to create task:', err);
      console.error('Error details:', err.response.data); 
      setError('Failed to create task. Please try again.');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create New Task</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
          <TextField
            name="task_name"
            label="Task Name"
            value={newTask.task_name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={newTask.category}
              onChange={handleChange}
            >
              <MenuItem value="Document">Document</MenuItem>
              <MenuItem value="Image">Image</MenuItem>
              <MenuItem value="Video">Video</MenuItem>
            </Select>
          </FormControl>
          <TextField
            name="quantity"
            label="Quantity"
            type="number"
            value={newTask.quantity}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="description"
            label="Description"
            value={newTask.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={newTask.status}
              onChange={handleChange}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      {error && (
        <Snackbar open autoHideDuration={6000} onClose={() => setError('')}>
          <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      )}
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Create Task</Button>
      </DialogActions>
    </Dialog>
  );
}