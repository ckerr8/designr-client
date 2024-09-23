

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from '../../../api';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import DeleteClient from "../../../components/DeleteClient/DeleteClient";
import EditClientDialog from "../../../components/EditClient/EditClient";

export default function ClientDetails() {
    const { idFromParams } = useParams();
    const [clientData, setClientData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editOpen, setEditOpen] = useState(false);

    useEffect(() => {
        const fetchClientWithAssetsAndProjects = async () => {
            try {
                const response = await api.get(`/clients/${idFromParams}`);
                setClientData(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch client data:', err);
                setError('Failed to fetch client data');
                setLoading(false);
            }
        };

        fetchClientWithAssetsAndProjects();
    }, [idFromParams]);

    const handleOpenDeleteModal = () => {
        setDeleteModalOpen(true);
      };
    
      const handleCloseDeleteModal = () => {
        setDeleteModalOpen(false);
      };

    const handleDeleteClient = async (clientId) => {
        try {
          const response = await api.delete(`/clients/${clientId}`);
          console.log(response.data.message);
          if (response.data.warning) {
            console.warn(response.data.warning);
          }
          // Handle successful deletion (e.g., navigate away or update state)
          handleCloseDeleteModal();
        } catch (error) {
          console.error('Error deleting asset:', error);
          // Handle error (e.g., show error message to user)
        }
      };

      const handleOpenEditModal = () => {
        setEditOpen(true);
    };

    const handleCloseEditModal = () => {
        setEditOpen(false);
    };

    const handleSaveClient = async (editedClient) => {
        try {
          const { id, contact_name, contact_email, contact_phone, address, city } = editedClient;
          const updateData = { contact_name, contact_email, contact_phone, address, city };
          
          const response = await api.put(`/clients/${id}`, updateData);
          setClientData(response.data);
          setEditOpen(false);
        } catch (error) {
          console.error('Error updating client:', error.response?.data || error.message);
        }
      };


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <Box className="main-contain">
            <Typography variant="h4">{clientData.contact_name}</Typography>
            <Typography variant="body1">Email: {clientData.contact_email}</Typography>
            <Typography variant="body1">Phone: {clientData.contact_phone}</Typography>
            <Button variant="outlined" onClick={handleOpenEditModal}>
                Edit Client
            </Button>

            <DeleteClient 
            clientId={clientData.id} 
            onDelete={handleDeleteClient}
    // Handle deletion logic here (e.g., call API to delete client)
  />
            {/* Render assets */}
            <Typography variant="h5" sx={{ mt: 4 }}>Assets</Typography>
        {clientData.assets && clientData.assets.map(asset => (
          <Card key={asset.id} sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="h6">{asset.asset_name}</Typography>
                        <Typography variant="body2">Category: {asset.category}</Typography>
                        <Typography variant="body2">Status: {asset.status}</Typography>
                    </CardContent>
                </Card>
            ))}

            {/* Render projects and their tasks */}
            <Typography variant="h5" sx={{ mt: 4 }}>Projects</Typography>
            {clientData.projects && clientData.projects.map(project => (
          <Card key={project.id} sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="h6">{project.project_name}</Typography>
                        <Typography variant="body2">{project.description}</Typography>

                        {/* Render tasks for each project */}
                        <Typography variant="h6" sx={{ mt: 2 }}>Tasks</Typography>
                        {project.tasks && project.tasks.map(task => (
              <Box key={task.id} sx={{ ml: 2, mb: 1 }}>
                                <Typography variant="body1">{task.task_name}</Typography>
                                <Typography variant="body2">Status: {task.status}</Typography>
                                <Typography variant="body2">Description: {task.description}</Typography>
                            </Box>
                        ))}
                    </CardContent>
                </Card>
            ))}
  <EditClientDialog 
      open={editOpen} 
      handleClose={handleCloseEditModal} 
      client={clientData} 
      onSave={handleSaveClient} 
    />
            
        </Box>
    );
}