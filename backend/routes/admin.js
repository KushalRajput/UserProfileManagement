var admin = require('../controllers/admin');
const express = require('express')
const router = express.Router()
const Auth = require('../authenticate');


router.get("/testing", admin.testing);
router.post('/verifyUser', admin.verifyUser)
router.post('/createAdmin', admin.createAdmin)
router.post('/loginAdmin', admin.loginAdmin)
router.get('/getAllUsers', Auth.auth, admin.getAllUsers)
router.post('/getUserById', Auth.auth, admin.getUsersById)
router.post('/deleteUser', Auth.auth, admin.deleteUser)
router.post('/createAndUpdateUser', Auth.auth, admin.createAndUpdateUser)

module.exports = router;

