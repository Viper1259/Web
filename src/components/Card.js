import React from 'react';
import { Card, CardContent, CardHeader, CardActions, Button, Typography, Box, Checkbox } from '@mui/material';
import moment from 'moment';

const TaskCard = ({ taskObj, index, deleteTask, updateListArray, toggleEdit }) => {
    const categoryColors = {
        Work: { primaryColor: "#5D93E1", secondaryColor: "#ECF3FC" },  
        Study: { primaryColor: "#F44336", secondaryColor: "#FFEBEE" }, 
        Rest: { primaryColor: "#FFEB3B", secondaryColor: "#FFFDE7" },  
    };

    const colors = categoryColors[taskObj.Category] || { primaryColor: "#B964F7", secondaryColor: "#F3F0FD" };

    const handleDelete = () => {
        deleteTask(index);
    };

    const handleCheck = () => {
        const updatedTask = { ...taskObj, completed: !taskObj.completed };
        updateListArray(updatedTask, index);
    };

    return (
        <Box sx={{ margin: 2 }}>
            <Card sx={{ position: 'relative', borderRadius: 2, boxShadow: 3 }}>
                <Box sx={{ height: 5, backgroundColor: colors.primaryColor }} />
                <CardContent sx={{ backgroundColor: colors.secondaryColor, borderRadius: 2 }}>
                    <CardHeader
                        title={<Typography variant="h6" sx={{ textDecoration: taskObj.completed ? 'line-through' : 'none' }}>{taskObj.Name}</Typography>}
                        subheader={taskObj.Deadline ? `Deadline: ${moment(taskObj.Deadline).format("MMM DD, YYYY")}` : null}
                        sx={{ backgroundColor: colors.secondaryColor, borderRadius: '10px' }}
                    />
                    <Typography variant="body2" sx={{ marginTop: 2, textDecoration: taskObj.completed ? 'line-through' : 'none' }}>
                        {taskObj.Description}
                    </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', position: 'absolute', bottom: 8, right: 8 }}>
                    <Checkbox
                        checked={taskObj.completed}
                        onChange={handleCheck}
                        sx={{ color: colors.primaryColor }}
                    />
                    <Button size="small" color="primary" onClick={() => toggleEdit(taskObj, index)} sx={{ color: colors.primaryColor }}>
                        Edit
                    </Button>
                    <Button size="small" color="primary" onClick={handleDelete} sx={{ color: colors.primaryColor }}>
                        Delete
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
};

export default TaskCard;
