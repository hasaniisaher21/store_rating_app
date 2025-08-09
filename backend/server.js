require('dotenv').config();
const express = require('express');
const cors = require('cors');

// --- Import Routes ---
const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');
const storeRoutes = require('./src/routes/store.routes');
const dashboardRoutes = require('./src/routes/dashboard.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middlewares ---
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/dashboard', dashboardRoutes);

// --- Basic Welcome Route ---
app.get('/', (req, res) => {
    res.send('Welcome to the Store Rating API!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});