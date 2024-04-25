const request = require('supertest');
const app = require("./userdetails");
const jwt = require('jsonwebtoken');

// Mock private key for JWT
const privateKey = "ChangeMePlease!!!!";

describe('User Details Endpoints', () => {
    it("Should return username if token is valid in getUsername endpoint", async () => {
        // Generate token for the mock user
        const token = jwt.sign({ user_id: 1 }, privateKey);

        global.fetch = jest.fn().mockResolvedValue({
            json: async () => ({name: "Juan"})
        });

        const response = await request(app)
            .post('/api/userdetails/name')
            .send({ token: token });

        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBeDefined(); // Assuming name should be present in the response
    });

    it("Should return history if token is valid in getHistory endpoint", async () => {
        // Generate token for the mock user
        const token = jwt.sign({ user_id: 1 }, privateKey);

        // Mock response from the external service
        const mockHistory = [{ game_id: 1, score: 100 }, { game_id: 2, score: 150 }];

        // Mocking fetch call
        global.fetch = jest.fn().mockResolvedValue({
            json: async () => (mockHistory)
        });

        const response = await request(app)
            .post('/api/userdetails/history')
            .send({ token: token });

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockHistory);
    });

    it("Should return history if token is valid in getHistoryByUser endpoint", async () => {
        // Generate token for the mock user
        const token = jwt.sign({ user_id: 1 }, privateKey);

        // Mock response from the external service
        const mockHistory = [{ game_id: 1, score: 100 }, { game_id: 2, score: 150 }];

        // Mocking fetch call
        global.fetch = jest.fn().mockResolvedValue({
            json: async () => (mockHistory)
        });

        const response = await request(app)
            .post('/api/userdetails/history-by-user')
            .send({ token: token, userId: 1 });

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockHistory);
    });

    it("Should return 400 if user id is not valid in getHistoryByUser endpoint", async () => {
        // Generate token for the mock user
        const token = jwt.sign({ user_id: 1 }, privateKey);

        // Mock response from the external service
        const mockHistory = [{ game_id: 1, score: 100 }, { game_id: 2, score: 150 }];

        // Mocking fetch call
        global.fetch = jest.fn().mockResolvedValue({
            json: async () => (mockHistory)
        });

        const response = await request(app)
            .post('/api/userdetails/history-by-user')
            .send({ token: token, userId: undefined });

        expect(response.statusCode).toBe(400);
    });
});
