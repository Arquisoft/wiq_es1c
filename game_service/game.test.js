const request = require('supertest')
const axios = require('axios')
const app = require("./game")
const Game = require("./models")

jest.mock('./services/questionsService', () => ({
    ...jest.requireActual('./services/questionsService'),
    loadQuestion: () => { return Promise.resolve( {
        "title": `Cual es la capital de Chile`,
        "answer": 'Santiago',
        "fakes" : [
           "Lima",
           "Madrid",
           "Bogota"
        ],
        "tags" : ["test"]
    })}
}));

const validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMSJ9.EGt29l9IqmFPQmV7_tFILwo6l8d5zBk6CSz2o15hv4U"

afterAll(() => {
    app.close();
})

jest.mock('axios')

describe('Game Service', () => {
    axios.post.mockImplementation((url,data) => {
        return Promise.resolve({ data: {
            "title": `Cual es la capital de Chile`,
            "answer": 'Santiago',
            "fake" : [
               "Lima",
               "Madrid",
               "Bogota"
            ],
            "tags" : ["test"]
        }});
    })

    it("Should return 400 with a valid token when requesting the next game", async () => {
        const response = await request(app)
            .post('/api/game/next')
            .send({ token: validToken });

        expect(response.statusCode).toBe(400);
    })

    it("Should return 400 with a valid token when requesting the answer game", async () => {
        const response = await request(app)
            .post('/api/game/awnser')
            .send({ token: validToken });

        expect(response.statusCode).toBe(400);
    })

    it("Should return 400 with a valid token when requesting the update game", async () => {
        const response = await request(app)
            .post('/api/game/update')
            .send({ token: validToken });

        expect(response.statusCode).toBe(400);
    })


    it("Should return 200 with a valid token when requesting a new game", async () => {
        const response = await request(app)
            .post('/api/game/new')
            .send({ token: validToken, tags: "test"});

        expect(response.statusCode).toBe(200);
    })

    it("Should return 200 with a valid token when requesting the next answer", async () => {
        const response = await request(app)
            .post('/api/game/next')
            .send({ token: validToken, lang: "es" });

        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe("Cual es la capital de Chile");
        expect(response.body.awnsers.length).toBe(4);
    })

    it("Should return 200 with a valid token when requesting an update", async () => {
        const response = await request(app)
            .post('/api/game/update')
            .send({ token: validToken });

        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe("Cual es la capital de Chile");
        expect(response.body.awnsers.length).toBe(4);
        expect(response.body.created).toMatch(/\d*/);
        expect(response.body.duration).toMatch(/\d*/);
    })

    it("Should return 200 with a valid token when sending an answer", async () => {
        const response = await request(app)
            .post('/api/game/awnser')
            .send({ token: validToken, awnser: "Santiago" });

        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("Santiago");
    })

    it("Should return 200 with a valid token when accessing game settings", async () =>
    {
        const response = await request(app)
            .post('/api/game/settings')
            .send({ token: validToken });

        expect(response.statusCode).toBe(200);
    });

    it("Should return 200 with a valid token when accessing game history", async () =>
    {
        const response = await request(app)
            .post('/api/game/getHistory')
            .send({ token: validToken });

        expect(response.statusCode).toBe(200);
    });

    it("Should return 200 with a valid user id when accessing game history by user", async () =>
    {
        const response = await request(app)
            .post('/api/game/getHistoryByUser')
            .send({ token: validToken, userId: '1234' });

        expect(response.statusCode).toBe(200);
    });

    it("Should return 400 with a not valid user id when accessing game history by user", async () =>
    {
        const response = await request(app)
            .post('/api/game/getHistoryByUser')
            .send({ token: validToken, userId: undefined });

        expect(response.statusCode).toBe(400);
    });

    it("Should return 200 with a valid token when accessing game settings", async () => {
        const response = await request(app)
            .post('/api/game/settings')
            .send({ token: validToken });

        expect(response.statusCode).toBe(200);
        expect(response.body.durationQuestion).toBe(10);
        expect(response.body.numberOfQuestions).toBe(10);
    });

    it("Should return 200 with a valid token when updating game settings", async () => {
        let response = await request(app)
            .post('/api/game/updatesettings')
            .send({ 
                token: validToken,
                durationQuestion: 65,
                numberOfQuestions: 41
            });

        expect(response.statusCode).toBe(200);

        response = await request(app)
            .post('/api/game/settings')
            .send({ token: validToken });

        expect(response.statusCode).toBe(200);
        expect(response.body.durationQuestion).toBe(65);
        expect(response.body.numberOfQuestions).toBe(41);
    });

    it("Should return 400 with a valid token when updating game settings with invalid duration and number of questions", async () => {
        let response = await request(app)
            .post('/api/game/updatesettings')
            .send({ 
                token: validToken,
                durationQuestion: 0,
                numberOfQuestions: 0
            });

        expect(response.statusCode).toBe(400);
    });

    it("Should return 400 with a valid token when updating game settings with invalid number of arguments", async () => {
        let response = await request(app)
            .post('/api/game/updatesettings')
            .send({ 
                token: validToken,
                numberOfQuestions: 0
            });

        expect(response.statusCode).toBe(400);
    });
})