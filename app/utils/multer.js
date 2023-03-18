const multer = require('multer');
const path = require('path');
const fs = require('fs');

const createDirectoryPath = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const directory = path.join(__dirname, "..", "..", "public", "uploads", "blogs", year, month, day);
    fs.mkdirSync(directory, { recursive: true });
    return directory;
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const filePath = createDirectoryPath();
        cb(null, filePath);
    },
    filename: (req, file, cb) => {
        const fileExtName = path.extname(file.originalname);
        const fileName = String(new Date().getTime() + fileExtName);
        cb(null, fileName);
    }
});

const uploadFile = multer({ storage });

module.exports = {
    uploadFile
}