import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, updateUser, fetchUsers } from "../app/usersSlice";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

const UserForm = ({ currentUser, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.users.status);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name,
        email: currentUser.email,
      });
    } else {
      setFormData({
        name: "",
        email: "",
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentUser) {
      await dispatch(updateUser({ id: currentUser.id, ...formData }));
    } else {
      await dispatch(addUser(formData));
    }
    await dispatch(fetchUsers());
    handleCancel();
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      email: "",
    });
    onCancel();
  };

  return (
    <Container component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        {currentUser ? "Edit User" : "Add User"}
      </Typography>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        type="email"
        required
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

export default UserForm;
