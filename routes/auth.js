const express =require('express')
const router = express.Router()
//controller
const {loginUser,signupUser} = require('../controllers/userController')

//login
router.post('/login',loginUser)
router.post('/signup',signupUser)


module.exports = router