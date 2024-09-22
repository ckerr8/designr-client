import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box
} from '@mui/material';

export default function DeleteAssetModal({ open, handleClose, asset, onDelete }) {
  const handleDelete = () => {
    if (asset && asset.id) {
      onDelete(asset.id);
    } else {
      console.error('Asset ID is not defined');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Asset</DialogTitle>
      <DialogContent>
        <Box sx={{ m: 2 }}>
          <Typography variant="body1" gutterBottom>
            Are you sure you want to delete the following asset?
          </Typography>
          <Typography variant="body2">
            <strong>Asset Name:</strong> {asset.asset_name}
          </Typography>
          <Typography variant="body2">
            <strong>Category:</strong> {asset.category}
          </Typography>
          <Typography variant="body2">
            <strong>Quantity:</strong> {asset.quantity}
          </Typography>
          {asset.tasks_id && (
            <Typography variant="body2" color="error">
              Warning: This asset is associated with a task (Task ID: {asset.tasks_id}).
              Deleting this asset will update the associated task.
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}