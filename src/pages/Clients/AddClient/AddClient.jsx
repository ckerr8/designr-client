import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../../api';
import {
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Box,
    Typography,
    Snackbar,
    Alert
} from '@mui/material';

export default function AddClient() {
    const navigate = useNavigate();
    const [newClient, setNewClient] = useState({
        address: '',
        city: '',
        industry: '',
        contact_name: '',
        contact_position: '',
        contact_phone: '',
        contact_email: '',
        status: 'active'
    });
    const [error, setError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewClient(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('/clients', newClient);
            setShowSuccess(true);
            setTimeout(() => {
                navigate('/clients'); // Adjust this path as needed
            }, 2000);
        } catch (err) {
            console.error('Failed to create client:', err);
            setError('Failed to create client. Please try again.');
        }
    };

    const handleClose = () => {
        navigate('/clients'); // Adjust this path as needed
    };

    return (
        <section className="main-contain">
            <Typography variant="h4" gutterBottom>
                Add New Client
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
                <TextField
                    name="contact_name"
                    label="Client Name"
                    value={newClient.contact_name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    name="contact_phone"
                    label="Phone Number"
                    value={newClient.contact_phone}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Status</InputLabel>
                    <Select
                        name="status"
                        value={newClient.status}
                        onChange={handleChange}
                    >
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="inactive">Inactive</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    name="contact_email"
                    label="Contact Email"
                    value={newClient.contact_email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                    type="email"
                />
                <Button onClick={handleClose} variant="outlined" sx={{ mr: 1 }}>Cancel</Button>
                <Button type="submit" variant="contained">Create Client</Button>
            </Box>
            <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
                <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
            <Snackbar open={showSuccess} autoHideDuration={6000} onClose={() => setShowSuccess(false)}>
                <Alert onClose={() => setShowSuccess(false)} severity="success" sx={{ width: '100%' }}>
                    Client created successfully!
                </Alert>
            </Snackbar>
        </section>
    );
}