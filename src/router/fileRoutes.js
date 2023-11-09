const express = require('express');
const fileRouter = express.Router();
const multer = require('multer');
const FileController = require('../controller/fileController');
const protect = require('../middleware/authmiddleware');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        const hex = Buffer.from(Date.now().toString()).toString('hex');
        cb(null, hex);
    }
});

const upload = multer({ storage });

fileRouter.get('/resume/:id', FileController.get_resume);
fileRouter.get('/profilepic/:id', FileController.get_profilepic);

fileRouter.post('/resume', protect, upload.single('file'), FileController.resume);
fileRouter.post('/profilepic', protect, upload.single('file'), FileController.profilepic);

module.exports = fileRouter;