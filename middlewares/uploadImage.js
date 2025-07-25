const multer = require("multer");

// const storage = multer.memoryStorage();
// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 },
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = ["image/jpeg", "image/png"];
//     if (!allowedTypes.includes(file.mimetype)) {
//       const error = new Error("Format Image tidak sesuai");
//       error.code = "INVALID_FILE_TYPE";
//       return cb(error, false);
//     }
//     cb(null, true);
//   },
// });
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });
console.log("Upload Image Middleware Loaded");

module.exports = upload.single("photo");
