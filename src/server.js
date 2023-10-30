const express = require('express');
const app = express();
const { errorHandler, notfound } = require('./middleware/errormiddleware');
const dotenv = require('dotenv');
// console.log(dotenv.config());
const path = require('path');
const bodyParser = require('body-parser');

dotenv.config();
const cors = require('cors');

const connect = require('./config/db');
const cookieParser = require('cookie-parser');
connect();

const port = process.env.PORT || 8000;


app.use(cors({
    origin: '*',
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Server is ready');
})

app.use('/api/student', require('./router/student_route'));
app.use('/api/company', require('./router/company_route'));
app.use('/api/jobprofile', require('./router/jobProfileRoutes'));
app.use('/api/announcements', require('./router/announcementRoutes'));
app.use('/api/student/files', require('./router/fileRoutes'));

app.use(errorHandler);
app.use(notfound);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
