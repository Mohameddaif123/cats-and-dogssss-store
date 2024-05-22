import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProfileAsync, logout } from './loginSlice'; // Import logout action
import { TextField, Button, Container, Typography } from '@mui/material';
import { toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css';

const UpdateProfile = () => {
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const dispatch = useDispatch();

    const handleUpdateUsername = async (e) => {
        e.preventDefault();
        try {
            if (newUsername) {
                await dispatch(updateProfileAsync({ username: newUsername }));
                toast.success('Username updated successfully');
                setTimeout(() => {
                    dispatch(logout());
                    window.location.href = '/login';
                }, 2000); // Redirect after 2 seconds
            } else {
                toast.info('No changes detected');
            }
        } catch (error) {
            toast.error('Failed to update username');
        } finally {
            setNewUsername('');
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        try {
            if (newPassword) {
                await dispatch(updateProfileAsync({ password: newPassword }));
                toast.success('Password updated successfully');
                setTimeout(() => {
                    dispatch(logout());
                    window.location.href = '/login';
                }, 2000); // Redirect after 2 seconds
            } else {
                toast.info('No changes detected');
            }
        } catch (error) {
            toast.error('Failed to update password');
        } finally {
            setNewPassword('');
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h2" gutterBottom>
                Update Profile
            </Typography>
            <form onSubmit={handleUpdateUsername}>
                <TextField
                    id="newUsername"
                    label="New Username"
                    variant="outlined"
                    fullWidth
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Update Username
                </Button>
            </form>
            <form onSubmit={handleUpdatePassword}>
                <TextField
                    id="newPassword"
                    label="New Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Update Password
                </Button>
            </form>
        </Container>
    );
};

export default UpdateProfile;
