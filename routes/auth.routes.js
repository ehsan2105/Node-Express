const express = require('express')

const authController = require('../controllers/auth.controllers')
const { RunCommandCursor } = require('mongodb')

const router = express.Router()

router.get('/signup',authController.getSignup)

router.post('/signup',authController.singup)

router.get('/login',authController.getLogin)

router.post('/login',authController.login)

router.post('/logout',authController.logout)


module.exports = router