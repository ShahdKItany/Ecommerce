import multer from 'multer';

export const fileType = {
    image: ['image/png', 'image/jpeg', 'image/webp'],
};

export function fileUpload(customTypes = []) {
    const storage = multer.diskStorage({});
    function fileFilter(req, file, cb) {
        if (customTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb("Invalid file format", false);
        }
    }
    return multer({ storage, fileFilter });
}
