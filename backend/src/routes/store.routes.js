const express = require('express');
const router = express.Router();
const storeController = require('../controllers/store.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');

// @route   GET /api/stores
// @desc    Get all stores with search and ratings
// @access  Public (but ratings are user-specific if logged in)
router.get('/', verifyToken, storeController.getAllStores); // verifyToken is used to get user info if available

// @route   POST /api/stores
// @desc    Add a new store (Admin only)
// @access  Private (Admin)
router.post('/', [verifyToken, isAdmin], storeController.addStore);

// @route   POST /api/stores/:storeId/ratings
// @desc    Submit or update a rating for a store
// @access  Private (Normal User)
router.post('/:storeId/ratings', verifyToken, storeController.submitRating);

// The PUT route for modifying a rating is handled by the POST route's UPSERT logic.

module.exports = router;
