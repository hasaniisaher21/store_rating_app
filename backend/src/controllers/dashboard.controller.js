const db = require('../config/db');

// Admin Dashboard Stats
exports.getAdminDashboard = async (req, res) => {
    try {
        const userCount = await db.query('SELECT COUNT(*) FROM users');
        const storeCount = await db.query('SELECT COUNT(*) FROM stores');
        const ratingCount = await db.query('SELECT COUNT(*) FROM ratings');

        res.status(200).json({
            totalUsers: parseInt(userCount.rows[0].count),
            totalStores: parseInt(storeCount.rows[0].count),
            totalRatings: parseInt(ratingCount.rows[0].count),
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};

// Store Owner Dashboard
exports.getOwnerDashboard = async (req, res) => {
    const ownerId = req.user.id;
    try {
        // Find the store owned by this user
        const storeResult = await db.query('SELECT id FROM stores WHERE owner_id = $1', [ownerId]);
        if (storeResult.rows.length === 0) {
            return res.status(404).json({ message: 'No store found for this owner.' });
        }
        const storeId = storeResult.rows[0].id;

        // Get average rating
        const avgRatingResult = await db.query('SELECT AVG(rating) as "averageRating" FROM ratings WHERE store_id = $1', [storeId]);
        const averageRating = parseFloat(avgRatingResult.rows[0].averageRating || 0).toFixed(2);

        // Get list of users who rated the store
        const ratersResult = await db.query(
            'SELECT u.name, u.email, r.rating FROM ratings r JOIN users u ON r.user_id = u.id WHERE r.store_id = $1',
            [storeId]
        );

        res.status(200).json({
            averageRating: averageRating,
            usersWhoRated: ratersResult.rows,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
};
