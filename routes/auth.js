const express = require("express");
const passport = require("passport");
const router = express.Router();
const authController = require("../controllers/authController");
const uploadImage = require("../middlewares/uploadImage");
const {
    registerValidation,
    loginValidation,
    profileValidation,
} = require("../middlewares/validators");
const { authenticate } = require("../middlewares/authenticate");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });

router.post("/register", registerValidation, authController.register);
router.post(
    "/login",
    loginValidation,
    passport.authenticate("local"),
    authController.loginSuccess
);
router.get("/logout", authController.logout);
router.get("/profile", authenticate, authController.getProfile);
router.put(
    "/profile/update",
    profileValidation,
    authenticate,
    authController.updateProfile
);

router.put(
    "/profile/image",
    authenticate,
    upload.single("photo"),
    authController.uploadProfileImage
);

module.exports = router;
