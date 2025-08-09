const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');
const { verifyToken, isAdmin, isStoreOwner } = require('../middlewares/auth.middleware');

// @route   GET /api/dashboard/admin
// @desc    Get stats for the admin dashboard
// @access  Private (Admin)
router.get('/admin', [verifyToken, isAdmin], dashboardController.getAdminDashboard);

// @route   GET /api/dashboard/owner
// @desc    Get stats for the store owner dashboard
// @access  Private (Store Owner)
router.get('/owner', [verifyToken, isStoreOwner], dashboardController.getOwnerDashboard);

module.exports = router;
