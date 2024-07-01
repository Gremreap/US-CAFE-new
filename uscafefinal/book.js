const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'project'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to the database');
});

app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;
    const query = 'INSERT INTO form_data (name, email, message) VALUES (?, ?, ?)';
    db.query(query, [name, email, date, time,venue], (err, result) => {
        if (err) {
            console.error('Error inserting data into the database: ' + err);
            res.send('Error submitting the form.');
        } else {
            res.send('Form data submitted successfully!');
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});