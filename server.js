const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(express.static('public'));

mongoose.connect('mongodb://mongo:27017/todo');

const Task = mongoose.model('Task', {
    text: String
});

// Add task
app.post('/add', async (req, res) => {
    const task = new Task({ text: req.body.text });
    await task.save();
    res.send("Task added");
});

// Get all tasks
app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// Delete task
app.delete('/delete/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.send("Deleted");
});

app.listen(3000, () => console.log("Server running on 3000"));