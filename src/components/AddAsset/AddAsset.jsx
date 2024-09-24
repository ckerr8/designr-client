import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography
} from '@mui/material';
import api from '../../api';

export default function CreateAssetModal({ open, handleClose, onAssetCreated }) {
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [newAsset, setNewAsset] = useState({
    asset_name: '',
    category: '',
    quantity: 0,
    clients_id: '',
    project_id: '', // Added project_id to state
    task_id: '', // Changed tasks_id to task_id for consistency
    status: 'active',
    remote_url: ''
  });

  // Fetch clients and projects when the modal opens
  useEffect(() => {
    if (open) {
      fetchClients();
      fetchProjects();
    }
  }, [open]);

  const fetchClients = async () => {
    try {
      const response = await api.get('/clients');
      setClients(response.data);
    } catch (err) {
      console.error('Failed to fetch clients:', err);
      setError('Failed to load clients. Please refresh the page.');
    }
  };

  // Function to fetch all projects
  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data);
      setLoadingProjects(false);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
      setError('Failed to load projects. Please refresh the page.');
      setLoadingProjects(false);
    }
  };

  // Function to fetch tasks related to the selected project
  const fetchTasks = async (projectId) => {
    if (!projectId) {
      setTasks([]);
      return;
    }
    try {
      const response = await api.get(`/projects/${projectId}`);
      setTasks(response.data.tasks || []);
      setLoadingTasks(false);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
      setError("Failed to load tasks. Please try again.");
      setLoadingTasks(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewAsset((prev) => ({ ...prev, [name]: value }));

    // Fetch tasks if a new project is selected
    if (name === 'project_id') {
      setLoadingTasks(true);
      fetchTasks(value);
    }
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!newAsset.asset_name || !newAsset.category || !newAsset.clients_id || !newAsset.project_id) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      const response = await api.post('/assets', newAsset);
      onAssetCreated(response.data);
      handleClose();
      
      // Reset form state
      setNewAsset({
        asset_name: '',
        category: '',
        quantity: 0,
        clients_id: '',
        project_id: '',
        task_id: '',
        status: 'active',
        remote_url: ''
      });
      setError(null);
    } catch (err) {
      console.error('Failed to create asset:', err);
      setError('Failed to create asset. Please try again.');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create New Asset</DialogTitle>
      <DialogContent>
        {error && (
          <Typography color="error" variant="body2" gutterBottom>
            {error}
          </Typography>
        )}
        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
          <TextField
            name="asset_name"
            label="Asset Name"
            value={newAsset.asset_name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={newAsset.category}
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
            value={newAsset.quantity}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Client</InputLabel>
            <Select
              name="clients_id"
              value={newAsset.clients_id}
              onChange={handleChange}
              required
            >
              {clients.map((client) => (
                <MenuItem key={client.id} value={client.id}>
                  {client.contact_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Project Selection */}
          <FormControl fullWidth margin="normal" required disabled={loadingProjects}>
            <InputLabel>Project</InputLabel>
            <Select
              name="project_id"
              value={newAsset.project_id}
              onChange={handleChange}
              label="Project"
            >
              {projects.map((project) => (
                <MenuItem key={project.id} value={project.id}>
                  {project.project_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Task Selection */}
          <FormControl fullWidth margin="normal" disabled={!newAsset.project_id || loadingTasks}>
            <InputLabel>Task</InputLabel>
            <Select
              name="task_id"
              value={newAsset.task_id}
              onChange={handleChange}
              label="Task"
            >
              {tasks.length === 0 ? (
                <MenuItem value="" disabled>
                  No tasks available
                </MenuItem>
              ) : (
                tasks.map((task) => (
                  <MenuItem key={task.id} value={task.id}>
                    {task.task_name}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={newAsset.status}
              onChange={handleChange}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
          <TextField
            name="remote_url"
            label="Remote URL"
            value={newAsset.remote_url}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Create Asset</Button>
      </DialogActions>
    </Dialog>
  );
}