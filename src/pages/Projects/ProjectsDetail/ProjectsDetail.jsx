import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from '../../../api';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  CardActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddTask from '../../../components/AddTask/AddTask';
import EditTaskDialog from "../../../components/EditTask/EditTask";

export default function ProjectDetails() {
  const { idFromParams } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  
  // New states for editing
  const [editOpen, setEditOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchProjectWithTasks = async () => {
    try {
      const response = await api.get(`/projects/${idFromParams}`);
      setProject(response.data);
      setTasks(response.data.tasks || []);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch project and tasks');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (idFromParams) {
      fetchProjectWithTasks();
    }
  }, [idFromParams]);

  const handleOpenDeleteModal = () => setDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setDeleteModalOpen(false);

  const handleDelete = async () => {
    try {
      await api.delete(`/projects/${idFromParams}`);
      handleCloseDeleteModal();
      navigate('/projects', { state: { message: 'Project deleted successfully' } });
    } catch (err) {
      console.error('Error deleting project:', err);
      setError('Failed to delete project. Please try again.');
    }
  };

  const handleTaskDeleted = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      await fetchProjectWithTasks();
    } catch (err) {
      console.error('Error deleting task:', err);
      setError('Failed to delete task. Please try again.');
    }
  };

  const handleAddTaskOpen = () => setIsAddTaskOpen(true);
  const handleAddTaskClose = () => setIsAddTaskOpen(false);

  const handleTaskCreated = async (newTask) => {
    console.log("New Task Created:", newTask);
    handleAddTaskClose();
    await fetchProjectWithTasks();
  };

  // New functions for editing
  const handleOpenEditModal = (task) => {
    setSelectedTask(task);
    setEditOpen(true);
  };

  const handleCloseEditModal = () => {
    setSelectedTask(null);
    setEditOpen(false);
  };

  const handleSaveTask = async (editedTask) => {
    try {
      const { id, task_name, quantity, category, description, status } = editedTask;
      const updateData = { task_name, quantity, category, description, status };
  
      const response = await api.put(`/tasks/${id}`, updateData);
  
      // Update the task in the local state without refetching
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? response.data : task))
      );
  
      setEditOpen(false);
      setSelectedTask(null);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error updating task:', error.response?.data || error.message);
      setError('Failed to update task. Please try again.');
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box className="main-contain">
    <Typography variant="h4" gutterBottom>
      {project.project_name}
    </Typography>
    
    {/* Add Task Button */}
    <Button variant="contained" color="primary" onClick={handleAddTaskOpen}>
      Add Task
    </Button>
    
    {/* Tasks List */}
    {tasks.length === 0 ? (
      <Typography>No tasks for this project.</Typography>
    ) : (
      tasks.map((task) => (
        <Card key={task.id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {task.task_name}
            </Typography>
            <Typography color="text.secondary">
              {task.description}
            </Typography>
            <Typography variant="body2">
              Category: {task.category}
            </Typography>
            <Typography variant="body2">
              Quantity: {task.quantity}
            </Typography>
            <Typography variant="body2">
              Status: {task.status}
            </Typography>
          </CardContent>
          <CardActions>
          <Button
  size="small"
  startIcon={<EditIcon />}
  onClick={() => handleOpenEditModal(task)}
>
  Edit
</Button>
            <Button
              size="small"
              startIcon={<DeleteIcon />}
              onClick={() => handleTaskDeleted(task.id)}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      ))
    )}

    {/* Add Task Dialog */}
    <AddTask open={isAddTaskOpen} handleClose={handleAddTaskClose} onTaskCreated={handleTaskCreated} />

    {/* Edit Task Dialog */}
    <EditTaskDialog
      open={editOpen}
      handleClose={handleCloseEditModal}
      task={selectedTask}
      onSave={handleSaveTask}
    />
    
    {/* Delete Project Dialog */}
    <Dialog open={deleteModalOpen} onClose={handleCloseDeleteModal}>
      <DialogTitle>Delete Project</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this project?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDeleteModal}>Cancel</Button>
        <Button onClick={handleDelete} color="error">Delete</Button>
      </DialogActions>
    </Dialog>
  </Box>
);
}