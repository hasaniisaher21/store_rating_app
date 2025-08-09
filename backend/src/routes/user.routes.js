const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');

// @route   GET /api/users
// @desc    Get all users (Admin only)
// @access  Private (Admin)
router.get('/', [verifyToken, isAdmin], userController.getAllUsers);

// @route   POST /api/users
// @desc    Add a new user (Admin only)
// @access  Private (Admin)
router.post('/', [verifyToken, isAdmin], userController.addUser);

// @route   PUT /api/users/password
// @desc    Update logged-in user's password
// @access  Private
router.put('/password', verifyToken, userController.updatePassword);

// @route   GET /api/users/:id
// @desc    Get user by ID (Admin only)
// @access  Private (Admin)
router.get('/:id', [verifyToken, isAdmin], userController.getUserById);

module.exports = router;