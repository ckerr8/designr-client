import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import SideMenu from '../../components/SideMenu/SideMenu.jsx';
import Header from '../../components/Header/Header.jsx';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Link } from 'react-router-dom'; // Import Link
import api from '../../api';
import './Clients.scss';

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await api.get('/clients'); // Adjust the endpoint as needed
      setClients(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch clients');
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className='main-contain'>
        {clients.map((client) => (
          <Card key={client.id} className='main-contain__item' sx={{ maxWidth: 345 }}>
            <CardActionArea component={Link} to={`/clients/${client.id}`}>
              <CardMedia
                component="img"
                height="160"
                image={client.remote_url}
                alt={client.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {client.contact_name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {client.category}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </>
  );
}