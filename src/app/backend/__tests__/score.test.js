const { addScore, getTopScores } = require('../src/score');

describe('Score Management', () => {
    beforeEach(() => {
        // Clear scores before each test
        scores = [];
    });

    test('should add a new score and keep top 10 scores sorted', () => {
        addScore('Player1', 100);
        addScore('Player2', 200);
        const topScores = getTopScores();

        expect(topScores.length).toBe(2);
        expect(topScores[0].playerName).toBe('Player2');
        expect(topScores[1].playerName).toBe('Player1');
    });

    test('should only keep the top 10 scores', () => {
        for (let i = 1; i <= 12; i++) {
            addScore(`Player${i}`, i * 100);
        }
        const topScores = getTopScores();

        expect(topScores.length).toBe(10);
        expect(topScores[0].playerName).toBe('Player12');  // Highest score
        expect(topScores[9].playerName).toBe('Player3');   // 10th highest score
    });
});
