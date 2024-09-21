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

export default function EditAssetDialog({ open, handleClose, asset, onSave }) {
  const [editedAsset, setEditedAsset] = useState(asset);

  useEffect(() => {
    setEditedAsset(asset);
  }, [asset]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedAsset(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(editedAsset);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{asset.id ? 'Edit Asset' : 'Create Asset'}</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
          <TextField
            name="asset_name"
            label="Asset Name"
            value={editedAsset.asset_name || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={editedAsset.category || ''}
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
            value={editedAsset.quantity || 0}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="clients_id"
            label="Client ID"
            value={editedAsset.clients_id || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="tasks_id"
            label="Task ID"
            value={editedAsset.tasks_id || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={editedAsset.status || 'active'}
              onChange={handleChange}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
          <TextField
            name="remote_url"
            label="Remote URL"
            value={editedAsset.remote_url || ''}
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