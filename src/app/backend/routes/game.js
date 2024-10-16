const express = require('express');
const router = express.Router();
const { handleGameOver } = require('../src/score');

// POST: Handle game over state
router.post('/game-over', (req, res) => {
    const { playerName, score } = req.body;

    // Validate input
    if (!playerName || typeof score !== 'number') {
        return res.status(400).json({ error: 'Invalid data' });
    }

    // Handle the game over logic and get the message
    const message = handleGameOver(playerName, score);

    res.status(200).json({ message });
});

module.exports = router;
