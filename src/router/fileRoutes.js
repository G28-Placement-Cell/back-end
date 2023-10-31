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

fileRouter.get('/:id', FileController.get);

fileRouter.post('/', protect, upload.single('file'), FileController.post);


module.exports = fileRouter;