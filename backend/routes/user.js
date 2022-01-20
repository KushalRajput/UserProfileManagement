var user = require('../controllers/user');
const express = require('express')
const router = express.Router()

router.post('/createUser', user.signUpUser)
router.post('/socialSignUp', user.socialSignUp)

module.exports = router;

