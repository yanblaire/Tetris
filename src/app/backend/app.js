const express = require('express');
const dotenv = require('dotenv');

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Import routes
const gameRoutes = require('./routes/game');  
const scoreRoutes = require('./routes/score');

// Use the routes
app.use('/api/game', gameRoutes);  
app.use('/api/score', scoreRoutes);

// Basic route for testing server
app.get('/api', (req, res) => {
    res.send('Tetris Backend is Running');
});

// Start server if not in test mode
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;  // Export the app for testing
