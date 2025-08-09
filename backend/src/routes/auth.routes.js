const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { signupValidator } = require('../middlewares/validators');

// @route   POST /api/auth/signup
// @desc    Register a new normal user
// @access  Public
router.post('/signup', signupValidator, authController.signup);

// @route   POST /api/auth/login
// @desc    Authenticate user and get token
// @access  Public
router.post('/login', authController.login);

module.exports = router;