import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  TextField, 
  Button, 
  Container, 
  Typography, 
  Stack,
  Paper,
  Snackbar,
  Alert
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import api from '../../../../api'
import './EditProject.scss';

export default function EditProjectPage() {
    const { idFromParams } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      project_name: '',
      description: '',
      deadline: null,
      price: '',
      clients_id: ''
    });
    const [error, setError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (date) => {
      setFormData(prev => ({ ...prev, deadline: date }));
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await api.put(`/projects/${idFromParams}`, formData);
        setShowSuccess(true);
        // If you have an onSave function, use it here
        // onSave(response.data);
        setTimeout(() => {
          navigate(`/projects/${idFromParams}`);
        }, 2000);
      } catch (err) {
        console.error('Failed to update project:', err);
        setError('Failed to update project. Please try again.');
      }
    };

    return (
      <Container maxWidth="md" className="main-contain">
        <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Edit Project
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Project Name"
                name="project_name"
                value={formData.project_name}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Deadline"
                  value={formData.deadline}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                InputProps={{ startAdornment: '$' }}
              />
              <TextField
                fullWidth
                label="Client ID"
                name="clients_id"
                value={formData.clients_id}
                onChange={handleChange}
              />
              <Button variant="contained" color="primary" type="submit">
                Save Changes
              </Button>
            </Stack>
          </form>
          <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
            <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
              {error}
            </Alert>
          </Snackbar>
          <Snackbar open={showSuccess} autoHideDuration={6000} onClose={() => setShowSuccess(false)}>
            <Alert onClose={() => setShowSuccess(false)} severity="success" sx={{ width: '100%' }}>
              Project updated successfully!
            </Alert>
          </Snackbar>
        </Paper>
      </Container>
    );
}