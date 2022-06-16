const express = require('express')
const passport = require('passport')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const user = require('../controllers/user')

router.get('/register', user.renderRegisterForm)

router.post('/register', catchAsync (user.register))

router.get('/login', user.getLoginForm)

router.post('/login', passport.authenticate('local', {failureFlash:true, failureRedirect:'/login'}), user.login)

router.get('/logout', user.logout)

module.exports = router