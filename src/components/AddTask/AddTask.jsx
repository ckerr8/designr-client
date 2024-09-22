import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
    MenuItem
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function AddTask({ open, handleClose, onAssetCreated }) {
    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const [newTask, setNewTask] = useState({
        category: '',
        status: '',
        quantity: 1,
        price: '',
        projects_id: '',
        status: 'active'
    });
    const [error, setError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const handleChange = (event) => {
    const { name, value } = event.target;
        setNewTask(prev => ({ ...prev, [name]: value }));
      };
    
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await api.get(`/tasks`);
                setTasks(response.data);
                      setLoading(false);
            } catch (err) {
                console.error('Failed to fetch clients:', err);
                setError('Failed to load clients. Please refresh the page.');
            }
        };
        fetchTasks();
    }, []);
    
      const handleSubmit = async () => {
        try {
          const response = await api.post('/tasks', newTask);
          onAssetCreated(response.data);
          handleClose();
        } catch (err) {
          console.error('Failed to create asset:', err);
         //Add error handling
        }
      };

    return (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogContent>
            <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
              <TextField
                name="asset_name"
                label="Task Name"
                value={newTask.category}
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
                name="clients_id"
                label="Client ID"
                value={newTask.project_id}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="task_name"
                label="Client ID"
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
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Create Task</Button>
          </DialogActions>
        </Dialog>
      );
}
