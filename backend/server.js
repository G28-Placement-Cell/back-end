const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const userRoute = require('./router/userRoute');
const port = 5000;

const connect = require('./config/db');
connect();

app.get('/', (req, res) => {
    res.send('Server is ready');
})

app.use('/api/users', userRoute);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
