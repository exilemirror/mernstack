const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();


app.get('/', (req, res) => res.send('Hello-World!'));

const PORT = process.env.PORT || 9090;
app.listen(PORT, () => console.log('Server is running on ' + PORT));