const Joi = require('joi');
const { UserModel } = require('../models/userModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const Auth = require('../authenticate');

exports.testing = (req, res) => {
    try {
        res.json({ message: 'okkk' })
    } catch (error) {
        res.json({
            statusCode: 400,
            message: error.message
        })
    }
}

function CreateToken(details) {
    return token = jwt.sign(details, process.env.SECRET_KEY);
}

exports.verifyUser = async (req, res) => {
    try {
        if (req.body.access_token) {
            const decoded = jwt.verify(
                req.body.access_token,
                process.env.SECRET_KEY,
            )
            res.status(200).json({
                message: "user verified",
                response: decoded,
                status_code: 200
            })
        }
        else {
            throw new Error('Auth Failed')
        }
    } catch (error) {
        res.status(403).json({ status_code: 403, message: error.message })
    }
}

exports.createAdmin = async (req, res) => {
    try {
        let { name, email, password } = req.body
        let uploadData = { name, email, password, admin: 1 }
        uploadData['access_token'] = CreateToken(uploadData)
        let user = new UserModel(uploadData);
        user.save();

        res.status(200).json({
            message: "Admin succcessfully Saved",
            response: user,
            status_code: 200
        })
    } catch (error) {
        res.status(403).json({ status_code: 403, message: error.message })
    }
}

exports.loginAdmin = async (req, res) => {
    try {
        let { email, password } = req.body

        let currentAdmin = await UserModel.findOne({ email: email }).lean()
        if (currentAdmin && currentAdmin.password === password) {
            let message;
            if (currentAdmin['admin'] == 1) message = "Admin succcessfully Logged In !!"
            else message = "User succcessfully Logged In !!"
            res.status(200).json({
                message: message,
                response: currentAdmin,
                status_code: 200
            })
        }
        else {
            throw new Error('Email/Password is Wrong')
        }

    } catch (error) {
        res.status(403).json({ status_code: 403, message: error.message })
    }
}

exports.createAndUpdateUser = async (req, res) => {
    try {
        let { name, email, gender, about, strengths, user_id, password } = req.body
        const schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
            about: Joi.any().optional(),
            gender: Joi.any().optional(),
            strengths: Joi.array().optional(),
            user_id: Joi.string().optional()
        })

        const result = schema.validate(req.body);
        if (result.error) {
            if (result.error.details && result.error.details[0].message) {
                res.status(400).json({
                    message: result.error.details[0].message
                });
            } else {
                res.status(400).json({
                    message: result.error.message
                });
            }
            return;
        }

        let uploadData = { name, email, gender, about, strengths, password, admin: 0 }
        uploadData['access_token'] = CreateToken(uploadData)

        if (user_id) {
            let data = await UserModel.findOneAndUpdate({ _id: user_id },
                {
                    $set: uploadData
                })

            res.status(200).json({
                message: "User succcessfully Saved",
                response: data,
                status_code: 200
            })

        }
        else {
            let user = new UserModel(uploadData);
            user.save();
            res.status(200).json({
                message: "User succcessfully Saved",
                response: user,
                status_code: 200
            })
        }
    } catch (error) {
        res.status(403).json({ status_code: 403, message: error.message })
    }
}

exports.getUsersById = async (req, res) => {
    try {
        let { user_id } = req.body
        let users = await UserModel.findOne({ _id: user_id });
        if (users) {
            res.status(200).json({ status_code: 200, message: "User fetched successfully.", response: users });
        } else {
            throw new Error("No users found....")
        }
    } catch (error) {
        res.status(403).json({ status_code: 403, message: error.message })
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        let users = await UserModel.find({ admin: { $ne: 1 } }).sort({ createdAt: -1 }).lean()
        if (users) {
            res.status(200).json({ status_code: 200, message: "Users fetched successfully.", response: users });
        }
        else {
            throw new Error("Data not found")
        }
    }
    catch (error) {
        res.status(403).json({ status_code: 403, message: error.message })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        let { user_id } = req.body
        let users = await UserModel.findOneAndDelete({ _id: user_id });
        if (users) {
            res.status(200).json({ status_code: 200, message: "User deleted successfully." });
        }
        else {
            throw new Error("Data not found")
        }
    } catch (error) {
        res.status(403).json({ status_code: 403, message: error.message });
    }
}

