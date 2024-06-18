import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { deleteTask, fetchTasks } from "../app/tasksSlice";

const TaskList = ({ onEdit }) => {
  const dispatch = useDispatch();
  const {
    tasks,
    status: taskStatus,
    error,
  } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDelete = (id) => {
    window.confirm("Record will be deleted") &&
      dispatch(deleteTask(id)).then(() => dispatch(fetchTasks()));
  };

  const renderListItems = () => {
    return tasks.map((task) => (
      <ListItem key={task.id}>
        <ListItemText
          primary={`Task Name: ${task.name}`}
          secondary={
            <>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
                sx={{ color: task.userId == 999999 && "red" }}
              >
                UserId: {task.userId}
              </Typography>
              <br />
              <Typography component="span" variant="body2" color="textPrimary">
                Task Description: {task.description}
              </Typography>
            </>
          }
        />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="edit" onClick={() => onEdit(task)}>
            <EditIcon />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => handleDelete(task.id)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ));
  };

  let content;

  if (taskStatus === "loading") {
    content = <CircularProgress />;
  } else if (taskStatus === "succeeded") {
    content = <List dense>{renderListItems()}</List>;
  } else if (taskStatus === "failed") {
    content = (
      <Alert severity="error" onClose={() => dispatch(fetchTasks())}>
        {error}
      </Alert>
    );
  }

  return (
    <Container>
      <Typography variant="h5" component="h1" gutterBottom>
        Tasks
      </Typography>
      {content}
    </Container>
  );
};

export default TaskList;
