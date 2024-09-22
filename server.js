const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;
const commentsFilePath = path.join(__dirname, 'comments.json');

let comments = [];

// Load comments from the JSON file if it exists
if (fs.existsSync(commentsFilePath)) {
    const data = fs.readFileSync(commentsFilePath);
    comments = JSON.parse(data);
}

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoint to get comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Endpoint to post a comment
app.post('/comments', (req, res) => {
    const { name, email, comment } = req.body;
    comments.push({ name, email, comment });
    
    // Save comments to the JSON file
    fs.writeFileSync(commentsFilePath, JSON.stringify(comments, null, 2));
    
    res.status(201).send('Comment added');
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
