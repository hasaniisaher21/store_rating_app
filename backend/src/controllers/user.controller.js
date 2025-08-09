const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Admin: Get all users with filtering
exports.getAllUsers = async (req, res) => {
    // Implementation for getting all users with filters (name, email, role)
    // This can be complex, so here's a basic version.
    // You would build the query dynamically based on req.query.
    try {
        const users = await db.query('SELECT id, name, email, address, role FROM users');
        res.status(200).json(users.rows);
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};

// Admin: Add a new user
exports.addUser = async (req, res) => {
    const { name, email, password, address, role } = req.body;
    // Add validation here
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await db.query(
            'INSERT INTO users (name, email, password, address, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, role',
            [name, email, hashedPassword, address, role]
        );
        res.status(201).json(newUser.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};

// Logged-in User: Update their own password
exports.updatePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    try {
        const userResult = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
        const user = userResult.rows[0];

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Current password is incorrect.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        await db.query('UPDATE users SET password = $1 WHERE id = $2', [hashedNewPassword, userId]);
        res.status(200).json({ message: 'Password updated successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};

// Admin: Get a single user's details
exports.getUserById = async (req, res) => {
    try {
        const user = await db.query('SELECT id, name, email, address, role FROM users WHERE id = $1', [req.params.id]);
        if (user.rows.length === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json(user.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};
