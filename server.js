const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(express.static('public'));
// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


// MongoDB connection
mongoose.connect('mongodb://mongo-service:27017/todo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("Mongo error:", err));
// Model
const Task = mongoose.model('Task', {
    text: String
});

// Routes

// Add task
app.post('/add', async (req, res) => {
    const task = new Task({ text: req.body.text });
    await task.save();
    res.send("Task added");
});

// Get tasks
app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// Delete task
app.delete('/delete/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.send("Deleted");
});

// Serve frontend (IMPORTANT)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start server (ONLY ONCE ✅)
app.listen(3000, () => console.log("Server running on port 3000"));