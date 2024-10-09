let scores = [];

/**
 * Adds a new score and keeps the list sorted in descending order.
 * @param {string} playerName - The name of the player.
 * @param {number} playerScore - The score achieved by the player.
 */
function addScore(playerName, playerScore) {
    scores.push({ playerName, score: playerScore });

    // Sort scores in descending order
    scores.sort((a, b) => b.score - a.score);

    // Keep only the top 10 scores
    scores = scores.slice(0, 10);
}

/**
 * Retrieves the current top 10 scores.
 * @returns {Array} - An array of the top 10 scores.
 */
function getTopScores() {
    return scores;
}

/**
 * Resets the scores array to an empty state.
 */
function resetScores() {
    scores = [];
}

module.exports = { addScore, getTopScores, resetScores };
