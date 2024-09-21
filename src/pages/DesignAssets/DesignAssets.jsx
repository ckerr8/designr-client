import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import api from '../../api';
import { Link } from 'react-router-dom'; 
import './DesignAssets.scss';
import AddAssetModal from '../../components/AddAsset/AddAsset';

export default function Assets() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    fetchAssets();
  }, []);

  // const fetchAssets = async () => {
  //   try {
  //     const response = await api.get('/assets');
  //     setAssets(response.data);
  //     setLoading(false);
  //   } catch (err) {
  //     setError('Failed to fetch design assets');
  //     setLoading(false);
  //   }
  // };

  const handleOpenAddModal = () => setIsAddModalOpen(true);
  const handleCloseAddModal = () => setIsAddModalOpen(false);

  const handleAddAsset = async (newAsset) => {
    try {
      await api.post('/assets', newAsset);
      handleCloseAddModal();
      await fetchAssets();
    } catch (err) {
      console.error('Failed to add new asset:', err);
    }
  };
  
  const fetchAssets = async () => {
    try {
      const response = await api.get('/assets');
      console.log('Fetched assets:', response.data);
      setAssets(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch assets:', err);
      setError('Failed to fetch design assets');
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className='main-contain'>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />} 
          onClick={handleOpenAddModal}
        >
          Add Asset
        </Button>
        {assets.map((asset) => (
          <Card key={asset.id} className='main-contain__item' sx={{ maxWidth: 345 }}>
            <CardActionArea component={Link} to={`/assets/${asset.id}`}>
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
      <AddAssetModal
        open={isAddModalOpen}
        handleClose={handleCloseAddModal}
        onAssetCreated={handleAddAsset}  
      />
    </>
  );
}