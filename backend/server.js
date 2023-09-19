const express = require('express');
const app = express();
const { errorHandler, notfound } = require('./middleware/errormiddleware');
const dotenv = require('dotenv');
dotenv.config();

const connect = require('./config/db');
connect();

const port = process.env.PORT || 5000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) => {
    res.send('Server is ready');
})

app.use('/api/student', require('./router/student_route'));


app.use(errorHandler);
app.use(notfound);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
