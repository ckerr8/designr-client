import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from '../../api';
import {
  Card, CardActionArea, CardContent, Typography,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Box, FormControl, InputLabel,
  Select, MenuItem, Snackbar, Alert
} from '@mui/material';

export default function TasksDetail() {
  const { idFromParams } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

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

  const handleAddTaskOpen = () => setIsAddTaskOpen(true);
  const handleAddTaskClose = () => setIsAddTaskOpen(false);

  const handleTaskCreated = (newTask) => {
    // Handle new task creation logic here
    console.log("New Task Created:", newTask);
    handleAddTaskClose();
    // Optionally refetch or update tasks
  };

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
      <Button variant="contained" onClick={handleAddTaskOpen}>Add New Task</Button>
      <AddTask open={isAddTaskOpen} handleClose={handleAddTaskClose} onAssetCreated={handleTaskCreated} />
    </div>
  );
}

function AddTask({ open, handleClose, onAssetCreated }) {
  const [newTask, setNewTask] = useState({
    category: '',
    status: 'active',
    quantity: 1,
    projects_id: '',
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
      const response = await api.post('/tasks', newTask);
      onAssetCreated(response.data);
      handleClose();
    } catch (err) {
      console.error('Failed to create task:', err);
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
            name="projects_id"
            label="Project ID"
            value={newTask.projects_id}
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