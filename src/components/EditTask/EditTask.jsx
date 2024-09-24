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

export default function EditTaskDialog({ open, handleClose, task, onSave }) {
  const [editedTask, setEditedTask] = useState(task || {});

  useEffect(() => {
    if (task) {
      setEditedTask(task);
    }
  }, [task]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(editedTask);
    handleClose();
  };

  if (!task) {
    return null; // Render nothing if there's no task
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{task.id ? 'Edit Task' : 'Create Task'}</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
          <TextField
            name="task_name"
            label="Task Name"
            value={editedTask.task_name || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="description"
            label="Description"
            value={editedTask.description || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={3}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={editedTask.category || ''}
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
            value={editedTask.quantity || 0}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={editedTask.status || 'active'}
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
        <Button onClick={handleSubmit} disabled={!editedTask.task_name}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

