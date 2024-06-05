import React from 'react';
import { Card, CardContent, CardHeader, CardActions, Button, Typography, Box, Checkbox } from '@mui/material';
import moment from 'moment';

const TaskCard = ({ taskObj, index, deleteTask, updateListArray }) => {
    const categoryColors = {
        Ready: { primaryColor: "#5D93E1", secondaryColor: "#ECF3FC" },
        Make: { primaryColor: "#F9D288", secondaryColor: "#FEFAF1" },
        Presentation: { primaryColor: "#5DC250", secondaryColor: "#F2FAF1" },
    };

    const colors = categoryColors[taskObj.Category] || { primaryColor: "#B964F7", secondaryColor: "#F3F0FD" };

    const handleDelete = () => {
        deleteTask(index);
    };

    return (
        <Box sx={{ margin: 2 }}>
            <Card sx={{ position: 'relative', borderRadius: 2, boxShadow: 3 }}>
                <Box sx={{ height: 5, backgroundColor: colors.primaryColor }} />
                <CardContent sx={{ backgroundColor: colors.secondaryColor, borderRadius: 2 }}>
                    <CardHeader
                        title={taskObj.Name}
                        subheader={taskObj.Deadline ? `Deadline: ${moment(taskObj.Deadline).format("MMM DD, YYYY")}` : null}
                        sx={{ backgroundColor: colors.secondaryColor, borderRadius: '10px' }}
                    />
                    <Typography variant="body2" sx={{ marginTop: 2 }}>
                        {taskObj.Description}
                    </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', position: 'absolute', bottom: 8, right: 8 }}>
                    <Checkbox
                        checked={taskObj.completed}
                        sx={{ color: colors.primaryColor }}
                    />
                    <Button size="small" color="primary" onClick={() => updateListArray(taskObj, index)} sx={{ color: colors.primaryColor }}>
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
