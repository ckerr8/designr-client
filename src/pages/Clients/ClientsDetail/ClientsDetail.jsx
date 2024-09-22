// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from '../../../api';
// import { Card, CardActionArea, CardMedia, CardContent, Typography, Box, Tabs, Tab,} from '@mui/material';
// import PropTypes from 'prop-types';
// import { List, ListItem, ListItemText } from '@mui/material';
// import { Link } from "react-router-dom";
// import DeleteClient from "../../../components/DeleteClient/DeleteClient";

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`vertical-tabpanel-${index}`}
//       aria-labelledby={`vertical-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           {children}
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `vertical-tab-${index}`,
//     'aria-controls': `vertical-tabpanel-${index}`,
//   };
// }

// export default function ClientsDetail() {
//     const { idFromParams } = useParams();
//     const [clientData, setClientData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [value, setValue] = useState(0);
//     const [tasks, setTasks] = useState([]);
    

//     useEffect(() => {
//         const fetchClientData = async () => {
//             try {
//                 const response = await api.get(`/clients/${idFromParams}`);
//                 setClientData(response.data);
                
//                 // Fetch tasks for all projects
//                 const tasksResponse = await api.get(`/tasks?clientId=${idFromParams}`);
//                 setTasks(tasksResponse.data);
//             } catch (err) {
//                 setError('Failed to fetch client data and tasks');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchClientData();
//     }, [idFromParams]);

    // const handleOpenDeleteModal = () => {
    //     setDeleteModalOpen(true);
    //   };
    
    //   const handleCloseDeleteModal = () => {
    //     setDeleteModalOpen(false);
    //   };

    // const handleDeleteClient = async (clientId) => {
    //     try {
    //       const response = await api.delete(`/clients/${clientId}`);
    //       console.log(response.data.message);
    //       if (response.data.warning) {
    //         console.warn(response.data.warning);
    //       }
    //       // Handle successful deletion (e.g., navigate away or update state)
    //       handleCloseDeleteModal();
    //     } catch (error) {
    //       console.error('Error deleting asset:', error);
    //       // Handle error (e.g., show error message to user)
    //     }
    //   };


    // const handleChange = (event, newValue) => {
    //     setValue(newValue);
    // };

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>{error}</div>;
//     if (!clientData) return <div>No client data found</div>;

//     const { assets, projects } = clientData;

//     return (
//         <div className='main-contain'>
//             <Card className='main-contain__item' sx={{ maxWidth: 345, marginBottom: 2 }}>
//                 <CardActionArea>
//                     <CardMedia
//                         component="img"
//                         height="160"
//                         image={clientData.remote_url}
//                         alt={clientData.title}
//                     />
//                     <CardContent>
//                         <Typography gutterBottom variant="h5" component="div">
//                             {clientData.contact_name}
//                         </Typography>
//                         <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//                             {clientData.category}
//                         </Typography>
//                         <Typography variant="body2">
//                             Email: {clientData.email}
//                         </Typography>
//                         <Typography variant="body2">
//                             Phone: {clientData.phone}
//                         </Typography>
//                     </CardContent>
//                 </CardActionArea>
//             </Card>

//             <section className="main-contain__tasks">
//                 <Typography variant="h2" gutterBottom>
//                     Projects for this Client
//                 </Typography>
//                 {projects.length === 0 ? (
//                     <Typography>No projects found for this client.</Typography>
//                 ) : (
//                     <Box className='main-contain__item' sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 300 }}>
//                         <Tabs
//                             orientation="vertical"
//                             variant="scrollable"
//                             value={value}
//                             onChange={handleChange}
//                             aria-label="Client Projects"
//                             sx={{ borderRight: 1, borderColor: 'divider', minWidth: 200 }}
//                         >
//                             {projects.map((project, index) => (
//                                 <Tab key={project.id} label={project.project_name} {...a11yProps(index)} />
//                             ))}
//                         </Tabs>
//                         {projects.map((project, index) => (
//                             <TabPanel key={project.id} value={value} index={index}>
//                                 <Typography variant="h6">{project.project_name}</Typography>
//                                 <Typography variant="body1">Status: {project.status}</Typography>
//                                 <Typography variant="body2">Description: {project.description}</Typography>
//                                 <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Tasks:</Typography>
//                                 <List>
//                                     {tasks.filter(task => task.project_id === project.id).map(task => (
//                                         <ListItem key={task.id}>
//                                             <ListItemText
//                                                 primary={task.title}
//                                                 secondary={`Status: ${task.status} - ${task.description}`}
//                                             />
//                                         </ListItem>
//                                     ))}
//                                 </List>
//                                 {tasks.filter(task => task.project_id === project.id).length === 0 && (
//                                     <Typography>No tasks for this project.</Typography>
//                                 )}
//                             </TabPanel>
//                         ))}
//                     </Box>
//                 )}
//             </section>

//             <section className="main-contain__assets">
//                 <Typography variant="h2" gutterBottom>
//                     Assets for this Client
//                 </Typography>
//                 {assets.length === 0 ? (
//                     <Typography>No assets found for this client.</Typography>
//                 ) : (
//                     <div container spacing={2}>
//                         {assets.map((asset) => (
//                             <div item xs={12} sm={6} md={4} key={asset.id}>
//                                 <Card component={Link} to={`/assets/${asset.id}`}>
//                                     <CardMedia
//                                         component="img"
//                                         height="140"
//                                         image={asset.remote_url}
//                                         alt={asset.title}
//                                     />
//                                     <CardContent>
//                                         <Typography gutterBottom variant="h6" component="div">
//                                             {asset.title}
//                                         </Typography>
//                                         <Typography variant="body2" color="text.secondary">
//                                             {asset.description}
//                                         </Typography>
//                                     </CardContent>
//                                 </Card>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </section>
//             <DeleteClient 
//             clientId={clientData.id} 
//             onDelete={handleDeleteClient}
//     // Handle deletion logic here (e.g., call API to delete client)
//   />
//         </div>
        
//     );
// }

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