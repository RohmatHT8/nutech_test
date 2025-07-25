const bcrypt = require("bcryptjs");
const { User, Balance } = require("../models");
const jwt = require("jsonwebtoken");
const imagekit = require("../utils/imagekit");

const { validationResult } = require("express-validator");

exports.getProfile = async (req, res) => {
    try {
        const { email } = req.user;

        const user = await User.findOne({
            where: { email },
            attributes: ["email", "first_name", "last_name", "profile_image"],
        });

        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "User tidak ditemukan",
                data: null,
            });
        }

        res.json({
            status: 0,
            message: "Sukses",
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan pada server",
            data: null,
        });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { email } = req.user;
        const { first_name, last_name } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "User tidak ditemukan",
                data: null,
            });
        }

        user.first_name = first_name;
        user.last_name = last_name;

        await user.save();

        res.json({
            status: 0,
            message: "Profil berhasil diperbarui",
            data: {
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                profile_image: user.profile_image,
            },
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan di server",
            data: null,
        });
    }
};

exports.uploadProfileImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                status: 102,
                message: "Format Image tidak sesuai",
                data: null,
            });
        }

        const { originalname, buffer, mimetype } = req.file;
        const email = req.user.email;

        const uploadResponse = await imagekit.upload({
            file: buffer,
            fileName: `profile-${Date.now()}-${originalname}`,
            folder: "/profile-images",
        });

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "User tidak ditemukan",
                data: null,
            });
        }

        user.profile_image = uploadResponse.url;
        await user.save();

        return res.status(200).json({
            status: 0,
            message: "Update Profile Image berhasil",
            data: {
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                profile_image: user.profile_image,
            },
        });
    } catch (err) {
        if (err.code === "INVALID_FILE_TYPE") {
            return res.status(400).json({
                status: 102,
                message: "Format Image tidak sesuai",
                data: null,
            });
        }

        return res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan di server",
            data: null,
        });
    }
};

exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, first_name, last_name, password } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res
                .status(400)
                .json({ status: 400, msg: "Email sudah terdaftar" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            email,
            first_name,
            last_name,
            password: hashedPassword,
        });

        await Balance.create({
            user_id: newUser.id,
            amount: 0,
        });

        res.status(201).json({
            status: 0,
            message: "Register Berhasil Silahkan Login",
            data: null,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.loginSuccess = (req, res) => {
    if (!req.user) {
        return res.status(401).json({
            status: 103,
            message: "Username atau password salah",
            data: null,
        });
    }

    const user = req.user;

    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
        status: 0,
        message: "Login Sukses",
        data: { token },
    });
};

exports.logout = (req, res) => {
    req.logout(() => {
        res.json({ message: "Logged out" });
    });
};
