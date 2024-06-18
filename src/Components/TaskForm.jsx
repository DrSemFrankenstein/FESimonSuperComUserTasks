import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Autocomplete,
} from "@mui/material";
import { addTask, fetchTasks, updateTask } from "../app/tasksSlice";

const TaskForm = ({ currentTask, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    userId: "",
    selectedUser: null,
  });

  const dispatch = useDispatch();
  const { users, status: userStatus } = useSelector((state) => state.users);

  useEffect(() => {
    if (currentTask) {
      setFormData({
        name: currentTask.name,
        description: currentTask.description,
        userId: currentTask.userId,
        selectedUser: users.find((user) => user.id === currentTask.userId) || null,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        userId: "",
        selectedUser: null,
      });
    }
  }, [currentTask, users]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentTask) {
      await dispatch(updateTask({ id: currentTask.id, ...formData }));
    } else {
      await dispatch(addTask(formData));
      setFormData({
        name: "",
        description: "",
        userId: "",
        selectedUser: null,
      });
    }
    await dispatch(fetchTasks());
    onCancel();
  };

  const handleUserChange = (event, value) => {
    const selectedUserId = value ? value.id : "";
    setFormData({
      ...formData,
      userId: selectedUserId,
      selectedUser: value,
    });
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      description: "",
      userId: "",
      selectedUser: null,
    });
    onCancel();
  };

  return (
    <Container component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        {currentTask ? "Edit Task" : "Add Task"}
      </Typography>
      <TextField
        label="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        fullWidth
        margin="normal"
        type="text"
        required
      />
      <Autocomplete
        disablePortal
        id="User"
        options={users}
        getOptionLabel={(option) => option.name}
        fullWidth
        value={formData.selectedUser}
        onChange={handleUserChange}
        renderInput={(params) => (
          <TextField {...params} label="User" margin="normal" required />
        )}
      />
      <Box sx={{ mt: 2 }}>
        <Button
          disabled={userStatus === "failed"}
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mr: 2 }}
        >
          Save
        </Button>
        <Button type="button" variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>
      </Box>
    </Container>
  );
};

export default TaskForm;
