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
  Box
} from '@mui/material';
import api from '../../api';

export default function CreateAssetModal({ open, handleClose, onAssetCreated, asset }) {
  const [clients, setClients] = useState([]);
  const [newAsset, setNewAsset] = useState({
    asset_name: '',
    category: '',
    quantity: 0,
    clients_id: '',
    tasks_id: null,
    status: 'active',
    remote_url: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewAsset(prev => ({ ...prev, [name]: value }));
  };

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


  const handleSubmit = async () => {
    try {
      const response = await api.post('/assets', newAsset);
      onAssetCreated(response.data);
      handleClose();
    } catch (err) {
      console.error('Failed to create asset:', err);
     //Add error handling
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create New Asset</DialogTitle>
      <DialogContent>
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
          <TextField
            name="tasks_id"
            label="Task ID"
            value={newAsset.tasks_id}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
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