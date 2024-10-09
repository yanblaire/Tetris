const request = require('supertest');
const app = require('../app');
const { resetScores } = require('../src/score');  // Import resetScores

describe('Score API', () => {

    // Clear scores before each test using the resetScores function
    beforeEach(() => {
        resetScores();  // Properly reset the scores array
    });

    test('POST /api/score/submit - should add a score', async () => {
        const response = await request(app)
            .post('/api/score/submit')
            .send({ playerName: 'Player1', score: 150 });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Score submitted successfully');
    });

    test('GET /api/score/top-scores - should retrieve top scores', async () => {
        // Add some scores first
        await request(app).post('/api/score/submit').send({ playerName: 'Player1', score: 150 });
        await request(app).post('/api/score/submit').send({ playerName: 'Player2', score: 250 });

        const response = await request(app).get('/api/score/top-scores');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);  // We expect 2 scores
    });
});
