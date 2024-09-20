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
import api from '../../api';
import './DesignAssets.scss';


export default function Assets() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const response = await api.get('/assets'); // Adjust the endpoint as needed
      setAssets(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch design assets');
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className='main-contain'>
        {assets.map((asset) => (
          <Card key={asset.id} className='main-contain__item' sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="160"
                image={asset.remote_url}
                alt={asset.category}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {asset.asset_name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {asset.category}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </>
  );
}

