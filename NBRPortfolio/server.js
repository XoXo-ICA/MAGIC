// Install Express and body-parser
// npm install express body-parser cors

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

let comments = []; // In-memory storage for demonstration

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from 'public' directory

// Endpoint to get comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Endpoint to post a comment
app.post('/comments', (req, res) => {
    const { name, email, comment } = req.body;
    comments.push({ name, email, comment });
    res.status(201).send('Comment added');
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
