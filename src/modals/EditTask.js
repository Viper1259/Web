import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box, MenuItem } from '@mui/material';

const EditTaskPopup = ({ modal, toggle, updateTask, taskObj }) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [deadline, setDeadline] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "taskName") {
            setTaskName(value);
        } else if (name === "description") {
            setDescription(value);
        } else if (name === "category") {
            setCategory(value);
        }
    };

    useEffect(() => {
        setTaskName(taskObj.Name);
        setDescription(taskObj.Description);
        setCategory(taskObj.Category);
        setDeadline(taskObj.Deadline ? new Date(taskObj.Deadline) : null);
    }, [taskObj]);

    const handleUpdate = (e) => {
        e.preventDefault();
        let tempObj = { Name: taskName, Description: description, Category: category, Deadline: deadline };
        updateTask(tempObj);
    };

    return (
        <Dialog open={modal} onClose={toggle}>
            <DialogTitle>Update Task</DialogTitle>
            <DialogContent>
                <Box component="form" sx={{ mt: 2 }}>
                    <TextField
                        label="Task Name"
                        variant="outlined"
                        fullWidth
                        value={taskName}
                        onChange={handleChange}
                        name="taskName"
                        margin="dense"
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={5}
                        value={description}
                        onChange={handleChange}
                        name="description"
                        margin="dense"
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        select
                        label="Category"
                        variant="outlined"
                        fullWidth
                        value={category}
                        onChange={handleChange}
                        name="category"
                        margin="dense"
                        sx={{ mb: 2 }}
                    >
                        <MenuItem value="Work">Work</MenuItem>
                        <MenuItem value="Study">Personal</MenuItem>
                        <MenuItem value="Rest">Shopping</MenuItem>                        
                    </TextField>
                    <DatePicker
                        selected={deadline}
                        onChange={(date) => setDeadline(date)}
                        dateFormat="MM/dd/yyyy"
                        placeholderText="Select Deadline"
                        isClearable
                        showYearDropdown
                        scrollableYearDropdown
                        name="deadline"
                        className="form-control"
                        style={{ width: '100%', marginBottom: '16px' }}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={handleUpdate}>Update</Button>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditTaskPopup;
