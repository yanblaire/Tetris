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
 * Handles game over logic and determines score rank.
 * @param {string} playerName - The name of the player.
 * @param {number} score - The score achieved by the player.
 * @returns {string} - A message indicating whether it's a high score, in the top 10, or lower than the lowest score.
 */
function handleGameOver(playerName, score) {
    const currentScores = getTopScores();

    // Determine the highest and lowest scores in the top 10
    const highestScore = currentScores.length > 0 ? currentScores[0].score : null;
    const lowestScore = currentScores.length > 0 ? currentScores[currentScores.length - 1].score : null;

    // Case 1: If it's higher than the highest score
    if (currentScores.length === 0 || score > highestScore) {
        addScore(playerName, score);
        return "It’s a high score!";
    }

    // Case 2: If it's lower than the highest but still in the top 10
    if (score <= highestScore && (currentScores.length < 10 || score > lowestScore)) {
        addScore(playerName, score);
        return "Your score is in the top 10!";
    }

    // Case 3: If it's lower than the lowest score in the top 10
    return "Good job, try again next time.";
}

/**
 * Resets the scores array to an empty state.
 */
function resetScores() {
    scores = [];
}

module.exports = { addScore, getTopScores, handleGameOver, resetScores };
