const createError = require('http-errors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const createDirectoryPath = (req) => {
    const date = new Date();
    const year = date.getFullYear() + "";
    const month = date.getMonth() + "";
    const day = date.getDate() + "";
    const directory = path.join(__dirname, "..", "..", "public", "uploads", "blogs", year, month, day);
    fs.mkdirSync(directory, { recursive: true });
    req.body.fileUploadPath = path.join("uploads", "blogs", year, month, day);
    return directory;
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file?.originalname) {
            const filePath = createDirectoryPath(req);
            return cb(null, filePath);
        }
        cb(null, null);
    },
    filename: (req, file, cb) => {
        if(file?.originalname) {
            const fileExtName = path.extname(file.originalname);
            const fileName = String(new Date().getTime() + fileExtName);
            req.body.filename = fileName;
            return cb(null, fileName);
        }
        cb(null, null);
    }
});

const fileFilter = (req, file, cb) => {
    const extname = path.extname(file.originalname);
    const extNames = [".png", ".jpeg", ".jpg", ".webp"];
    if(extNames.includes(extname)) return cb(null, true);
    return cb(createError.BadRequest("فرمت تصویر ارسال شده صحیح نمیباشد"));
}
const maxSize = 1 * 1000 * 1000;
const uploadFile = multer({ storage, fileFilter, limits: { fileSize: maxSize } });

module.exports = {
    uploadFile
}