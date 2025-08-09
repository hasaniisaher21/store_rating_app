const db = require('../config/db');

// Get all stores with search and ratings
exports.getAllStores = async (req, res) => {
    const userId = req.user ? req.user.id : null; // Get user ID if logged in
    const { search } = req.query;

    try {
        let query = `
            SELECT
                s.id,
                s.name,
                s.address,
                s.owner_id,
                COALESCE(AVG(r.rating), 0) as "overallRating",
                (SELECT rating FROM ratings WHERE store_id = s.id AND user_id = $1) as "userSubmittedRating"
            FROM
                stores s
            LEFT JOIN
                ratings r ON s.id = r.store_id
        `;
        const queryParams = [userId];

        if (search) {
            query += ` WHERE s.name ILIKE $2 OR s.address ILIKE $2`;
            queryParams.push(`%${search}%`);
        }

        query += ` GROUP BY s.id ORDER BY s.name ASC`;

        const stores = await db.query(query, queryParams);
        res.status(200).json(stores.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
};

// Admin: Add a new store
exports.addStore = async (req, res) => {
    const { name, address, owner_id } = req.body;
    try {
        const newStore = await db.query(
            'INSERT INTO stores (name, address, owner_id) VALUES ($1, $2, $3) RETURNING *',
            [name, address, owner_id]
        );
        res.status(201).json(newStore.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};

// User: Submit or update a rating
exports.submitRating = async (req, res) => {
    const { rating } = req.body;
    const { storeId } = req.params;
    const userId = req.user.id;

    if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
    }

    try {
        // UPSERT logic: Insert or update if exists
        const query = `
            INSERT INTO ratings (user_id, store_id, rating)
            VALUES ($1, $2, $3)
            ON CONFLICT (user_id, store_id)
            DO UPDATE SET rating = EXCLUDED.rating
            RETURNING *;
        `;
        const newRating = await db.query(query, [userId, storeId, rating]);
        res.status(201).json(newRating.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
};
