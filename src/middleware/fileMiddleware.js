const { uploadFile } = require("../utils/fileservice");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        console.log(file);
        const hex = Buffer.from(Date.now().toString()).toString('hex');
        cb(null, hex);
    }
});

const upload = multer({ storage: storage });

async function gridFSMiddleware(req, res, next) {
    if(!req.file) return next();
    const file_id = uploadFile({ file: req.file });
    req.file._id = file_id;
    req.file.url = `http://localhost:8000/api/student/files/${file_id}`;
    next();
};

module.exports = {
    upload,
    gridFSMiddleware,
}