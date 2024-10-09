const express = require('express');
const router = express.Router();
const { addScore, getTopScores } = require('../src/score');

// POST: Submit a new score
router.post('/submit', (req, res) => {
    const { playerName, score } = req.body;

    // Validate input
    if (!playerName || typeof score !== 'number') {
        return res.status(400).json({ error: 'Invalid data' });
    }

    // Add the score
    addScore(playerName, score);
    res.status(200).json({ message: 'Score submitted successfully' });
});

// GET: Retrieve the top 10 scores
router.get('/top-scores', (req, res) => {
    const topScores = getTopScores();
    res.status(200).json(topScores);
});

module.exports = router;
