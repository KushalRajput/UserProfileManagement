const Joi = require('joi');
const { UserModel } = require('../models/userModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');


function CreateToken(details) {
    return token = jwt.sign(details, 'neosofttechnologies');
}

exports.signUpUser = async (req, res) => {
    try {
        let { name, email, password } = req.body
        const schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
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

        let uploadData = { name, email, password, admin: 0 }
        uploadData['access_token'] = CreateToken(uploadData)

        let data = await UserModel.findOne({ email: email })
        if (!data) {
            let user = new UserModel(uploadData);
            user.save();
            res.status(200).json({
                message: "User succcessfully Saved",
                response: user['access_token'],
                status_code: 200
            })
        }
        else {
            throw new Error('Email Id already exist, Please Log in !!')
        }

    } catch (error) {
        res.status(403).json({ status_code: 403, message: error.message })
    }
}


exports.socialSignUp = async (req, res) => {
    try {
        let { email, name } = req.body
        let currentUser = await UserModel.findOne({ email: email }).lean()
        if (currentUser) {
            currentUser['access_token'] = CreateToken(currentUser)
            res.status(200).json({
                message: "User succcessfully Logged In !!",
                response: currentUser['access_token'],
                status_code: 200
            })
        }
        else {
            let data = { email, name, admin: 0 }
            data['access_token'] = CreateToken(data)
            let user = new UserModel(data);
            user.save();
            res.status(200).json({
                message: "User succcessfully Logged In !!",
                response: user['access_token'],
                status_code: 200
            })
        }
    } catch (error) {
        res.status(403).json({ status_code: 403, message: error.message })
    }
}