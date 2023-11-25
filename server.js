const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 4000;

app.listen(port, () => {
    console.log('Server on',{port});
});

const tasks = [];

app.get('/api/tasks', (req, res) =>{
    res.json(tasks);
});

app.post('/api/tasks', express.json(), (req, res) => {
    const {text} =req.body;
    console.log(text)
    const newTask = { id: Date.now(), text };
    tasks.push(newTask);
    res.json(newTask);
}); 