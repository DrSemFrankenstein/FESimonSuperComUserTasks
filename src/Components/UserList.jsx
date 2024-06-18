import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, deleteUser } from "../app/usersSlice";
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

const UserList = ({ onEdit }) => {
  const dispatch = useDispatch();
  const {
    users,
    status: userStatus,
    error,
  } = useSelector((state) => state.users);
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (userStatus === "failed") {
      setAlertOpen(true);
    }
  }, [userStatus]);

  const handleDelete = (id) => {
    window.confirm("Record will be deleted") &&
      dispatch(deleteUser(id)).then(() => dispatch(fetchUsers()));
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
    dispatch(fetchUsers());
  };

  const renderListItems = () => {
    return users.map((user) => (
      <ListItem key={user.id}>
        <ListItemText
          primary={`User Id: ${user.id}`}
          secondary={
            <>
              <Typography component="span" variant="body2" color="textPrimary">
                UserName: {user.name}
              </Typography>
              <br />
              <Typography component="span" variant="body2" color="textPrimary">
                User Email: {user.email}
              </Typography>
            </>
          }
        />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="edit" onClick={() => onEdit(user)}>
            <EditIcon />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => handleDelete(user.id)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ));
  };

  let content;

  if (userStatus === "loading") {
    content = <CircularProgress />;
  } else if (userStatus === "succeeded") {
    content = <List dense>{renderListItems()}</List>;
  }

  return (
    <Container>
      <Typography variant="h5" component="h1" gutterBottom>
        Users
      </Typography>
      {content}
      {alertOpen && (
        <Alert severity="error" onClose={handleAlertClose}>
          {error}
        </Alert>
      )}
    </Container>
  );
};

export default UserList;
