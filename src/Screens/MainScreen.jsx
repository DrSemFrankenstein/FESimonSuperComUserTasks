import React, { useState } from "react";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import UserForm from "../Components/UserForm";
import UserList from "../Components/UserList";
import TaskForm from "../Components/TaskForm";
import TaskList from "../Components/TaskList";

export default function MainScreen() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);

  const handleEditUser = (user) => setCurrentUser(user);
  const handleCancelUser = () => setCurrentUser(null);
  const handleEditTask = (task) => setCurrentTask(task);
  const handleCancelTask = () => setCurrentTask(null);

  return (
    <Container maxWidth="xl" sx={{ pt: 2, minHeight: "90vh" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={5.5}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4">User Management</Typography>
            <UserForm currentUser={currentUser} onCancel={handleCancelUser} />
          </Box>
          <UserList onEdit={handleEditUser} />
        </Grid>
        <Divider orientation="vertical" flexItem sx={{m:5}}/>
        <Grid item xs={12} md={5.5}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4">Task Management</Typography>
            <TaskForm currentTask={currentTask} onCancel={handleCancelTask} />
          </Box>
          <TaskList onEdit={handleEditTask} />
        </Grid>
      </Grid>
    </Container>
  );
}
