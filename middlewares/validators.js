const { body, validationResult } = require("express-validator");

const customErrorFormatter = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 102,
            message: errors.array()[0].msg,
            data: null,
        });
    }

    next();
};

exports.registerValidation = [
    body("email")
        .isEmail()
        .withMessage("Paramter email tidak sesuai format")
        .notEmpty()
        .withMessage("Email wajib diisi"),
    body("first_name").notEmpty().withMessage("Nama depan wajib diisi"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password minimal 6 karakter"),
    customErrorFormatter,
];

exports.loginValidation = [
    body("email")
        .isEmail()
        .withMessage("Paramter email tidak sesuai format")
        .notEmpty()
        .withMessage("Email wajib diisi"),
    customErrorFormatter,
];

exports.profileValidation = [
    body("first_name").notEmpty().withMessage("First Name wajib diisi"),
    customErrorFormatter,
];

exports.topUpValidation = [
    body("top_up_amount")
        .notEmpty()
        .withMessage("Jumlah top up wajib diisi")
        .bail()
        .isInt({ min: 1 })
        .withMessage(
            "Parameter amount hanya boleh angka dan tidak boleh lebih kecil 0"
        ),
    customErrorFormatter,
];
