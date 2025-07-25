require('dotenv').config();
const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            status: 401,
            message: "Token tidak ditemukan",
            data: null
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                status: 403,
                message: "Token tidak valid atau telah kedaluwarsa",
                data: null
            });
        }

        req.user = user;
        next();
    });
}

