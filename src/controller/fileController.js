const { uploadFile, retrieveFile } = require('../utils/fileservice');
const student = require('../models/studentModel');

const FileController = {
    get: async (req, res) => {
        const { id } = req.params;
        await retrieveFile({ fileId: id, stream: res });

    },
    post: async (req, res) => {
        const { id } = await uploadFile({ file: req.file });
        // console.log(id);
        // sleep(5000);
        const stu = await student.findByIdAndUpdate(req.student._id, { resume: id }, { new: true });
        // console.log(stu);
        if (stu) {
            res.json({
                message: 'File uploaded successfully',
                fileId: id,
            });
        }
        else {
            res.json({
                message: 'File not uploaded',
                fileId: id,
            });
        }
    }
};

module.exports = FileController;