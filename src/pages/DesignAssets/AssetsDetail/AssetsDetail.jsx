import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from '../../../api';
import { Card, CardActionArea, CardMedia, CardContent, Typography, Button } from '@mui/material';
import EditAssetDialog from '../../../components/EditAsset/EditAsset';
import DeleteAssetModal from '../../../components/DeleteAsset/DeleteAsset';

export default function AssetsDetail() {
    const { idFromParams } = useParams();
    const navigate = useNavigate();
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [asset, setAsset] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (idFromParams !== 'new') {
            fetchAsset();
        } else {
            setAsset({
                asset_name: '',
                category: '',
                quantity: 0,
                clients_id: '',
                tasks_id: null,
                status: 'active',
                local_image_path: null,
                remote_url: ''
            });
            setLoading(false);
        }
    }, [idFromParams]);

    const fetchAsset = async () => {
        try {
            const response = await api.get(`/assets/${idFromParams}`);
            setAsset(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch asset');
            setLoading(false);
        }
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
   
    const handleSave = async (editedAsset) => {
        try {
            const { id, created_at, updated_at, ...updateData } = editedAsset;
            let response;
            if (idFromParams === 'new') {
                response = await api.post('/assets', updateData);
                navigate(`/assets/${response.data.id}`);
            } else {
                response = await api.put(`/assets/${idFromParams}`, updateData);
            }
            setAsset(response.data);
            setOpen(false);
        } catch (err) {
            console.error('Failed to save asset:', err);
            if (err.response) {
                console.error('Error data:', err.response.data);
                console.error('Error status:', err.response.status);
            }
            setError('Failed to save asset. Please try again.');
        }
    };

    const handleOpenDeleteModal = () => {
        setDeleteModalOpen(true);
      };
    
      const handleCloseDeleteModal = () => {
        setDeleteModalOpen(false);
      };
    
      const handleDeleteAsset = async (assetId) => {
        try {
          const response = await api.delete(`/assets/${assetId}`);
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!asset) return <div>No asset data found</div>;

    return (
        <div className='main-contain'>
            <Card className='main-contain__item' sx={{ maxWidth: 345 }}>
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
                            Category: {asset.category}
                        </Typography>
                        <Typography variant="body2">
                            Quantity: {asset.quantity}
                        </Typography>
                        <Typography variant="body2">
                            Status: {asset.status}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Button variant="outlined" onClick={handleOpen}>
                {idFromParams === 'new' ? 'Create Asset' : 'Edit Asset'}
            </Button>
            <EditAssetDialog
                open={open}
                handleClose={handleClose}
                asset={asset}
                onSave={handleSave}
            />
               <Button onClick={handleOpenDeleteModal} color="error">
        Delete Asset
      </Button>
      <DeleteAssetModal
        open={deleteModalOpen}
        handleClose={handleCloseDeleteModal}
        asset={asset}
        onDelete={handleDeleteAsset}
      />
        </div>
    );
}