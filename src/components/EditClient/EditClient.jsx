import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box
} from '@mui/material';

export default function EditClientDialog({ open, handleClose, client, onSave }) {
  const [editedClient, setEditedClient] = useState(client);

  useEffect(() => {
    setEditedClient(client);
  }, [client]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedClient(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(editedClient);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Client</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
          <TextField
            name="contact_name"
            label="Contact Name"
            value={editedClient.contact_name || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="contact_email"
            label="Email"
            value={editedClient.contact_email || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="contact_phone"
            label="Phone Number"
            value={editedClient.contact_phone || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="address"
            label="Address"
            value={editedClient.address || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="city"
            label="City"
            value={editedClient.city || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}