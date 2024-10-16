const request = require('supertest');
const app = require('../app');
const { resetScores } = require('../src/score');

describe('Game Over API', () => {

    // Reset scores before each test
    beforeEach(() => {
        resetScores();
    });

    test('POST /api/game/game-over - should record game over as a high score', async () => {
        const response = await request(app)
            .post('/api/game/game-over')
            .send({ playerName: 'Player1', score: 2000 });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("It’s a high score!");
    });

    test('POST /api/game/game-over - should record game over as a top 10 score', async () => {
        // Add some initial high scores first
        await request(app).post('/api/game/game-over').send({ playerName: 'Player1', score: 3000 });
        await request(app).post('/api/game/game-over').send({ playerName: 'Player2', score: 2500 });

        const response = await request(app)
            .post('/api/game/game-over')
            .send({ playerName: 'Player3', score: 2600 });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Your score is in the top 10!");
    });

    test('POST /api/game/game-over - should record game over as not a high score (try again)', async () => {
        // Fill the top 10 scores with high values
        for (let i = 1; i <= 10; i++) {
            await request(app)
                .post('/api/game/game-over')
                .send({ playerName: `Player${i}`, score: 3000 - i * 100 });
        }

        const response = await request(app)
            .post('/api/game/game-over')
            .send({ playerName: 'Player11', score: 1000 });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Good job, try again next time.");
    });
});
