import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import CreateTaskPopup from '../modals/CreateTask';
import EditTaskPopup from '../modals/EditTask';
import TaskCard from './Card';

const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [taskList, setTaskList] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);

    useEffect(() => {
        let arr = localStorage.getItem("taskList");
        if (arr) {
            let obj = JSON.parse(arr);
            setTaskList(obj);
        }
    }, []);

    const deleteTask = (index) => {
        let tempList = [...taskList];
        tempList.splice(index, 1);
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
    };

    const updateListArray = (obj, index) => {
        let tempList = [...taskList];
        tempList[index] = obj;
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
    };

    const toggle = () => {
        setModal(!modal);
    };

    const toggleEdit = (taskObj, index) => {
        setSelectedTask(taskObj);
        setSelectedIndex(index);
        setEditModal(!editModal);
    };

    const saveTask = (taskObj) => {
        let tempList = [...taskList];
        tempList.push(taskObj);
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
        setModal(false);
    };

    const updateTask = (taskObj) => {
        updateListArray(taskObj, selectedIndex);
        setEditModal(false);
    };

    return (
        <Box sx={{ textAlign: 'center', p: 3 }}>
            <Typography variant="h4" gutterBottom>Todo List</Typography>
            <Button variant="contained" color="primary" onClick={toggle}>Create Task</Button>
            <Box sx={{ mt: 3 }}>
                {taskList && taskList.map((obj, index) => (
                    <TaskCard 
                        key={index}
                        taskObj={obj}
                        index={index}
                        deleteTask={deleteTask}
                        updateListArray={updateListArray}
                        toggleEdit={toggleEdit}
                    />
                ))}
            </Box>
            <CreateTaskPopup toggle={toggle} modal={modal} save={saveTask} />
            {selectedTask && (
                <EditTaskPopup 
                    toggle={() => setEditModal(!editModal)} 
                    modal={editModal} 
                    updateTask={updateTask} 
                    taskObj={selectedTask} 
                />
            )}
        </Box>
    );
};

export default TodoList;
