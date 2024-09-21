import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../../api';
import dayjs from 'dayjs';

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
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function AddProject() {
    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const [newProject, setNewProject] = useState({
        project_name: '',
        description: '',
        deadline: null,
        price: '',
        clients_id: '',
        status: 'active'
    });
    const [error, setError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await api.get('/clients');
                setClients(response.data);
            } catch (err) {
                console.error('Failed to fetch clients:', err);
                setError('Failed to load clients. Please refresh the page.');
            }
        };
        fetchClients();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewProject(prev => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (date) => {
        setNewProject(prev => ({ ...prev, deadline: date }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const { status, ...projectData } = {
            project_name: newProject.project_name,
            description: newProject.description,
            deadline: newProject.deadline ? dayjs(newProject.deadline).format('YYYY-MM-DD') : null,
            price: newProject.price ? parseFloat(newProject.price) : null,
            clients_id: newProject.clients_id,
          };
      
          console.log('Sending project data:', projectData);
      
          const response = await api.post('/projects', projectData);
            setShowSuccess(true);
            setTimeout(() => {
                navigate('/projects');
            }, 2000);
        } catch (err) {
            console.error('Failed to create project:', err);
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Error data:', err.response.data);
                console.error('Error status:', err.response.status);
                console.error('Error headers:', err.response.headers);
                setError(`Failed to create project: ${err.response.data.error || err.response.data.message || 'Unknown error'}`);
            } else if (err.request) {
                // The request was made but no response was received
                console.error('Error request:', err.request);
                setError('Failed to create project: No response received from server');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error message:', err.message);
                setError(`Failed to create project: ${err.message}`);
            }
        }
    };

    return (
        <section className="main-contain">
            <Typography variant="h4" gutterBottom>
                Add New Project
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
                <TextField
                    name="project_name"
                    label="Project Name"
                    value={newProject.project_name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    name="description"
                    label="Description"
                    value={newProject.description}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Deadline"
                        value={newProject.deadline}
                        onChange={handleDateChange}
                        renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                    />
                </LocalizationProvider>
                <TextField
                    name="price"
                    label="Price"
                    value={newProject.price}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    type="number"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Client</InputLabel>
                    <Select
                        name="clients_id"
                        value={newProject.clients_id}
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
                <FormControl fullWidth margin="normal">
                    <InputLabel>Status</InputLabel>
                    <Select
                        name="status"
                        value={newProject.status}
                        onChange={handleChange}
                    >
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="inactive">Inactive</MenuItem>
                    </Select>
                </FormControl>
                <Button onClick={() => navigate('/projects')} variant="outlined" sx={{ mr: 1 }}>Cancel</Button>
                <Button type="submit" variant="contained">Create Project</Button>
            </Box>
            <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
                <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
            <Snackbar open={showSuccess} autoHideDuration={6000} onClose={() => setShowSuccess(false)}>
                <Alert onClose={() => setShowSuccess(false)} severity="success" sx={{ width: '100%' }}>
                    Project created successfully!
                </Alert>
            </Snackbar>
        </section>
    );
}