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
            "fakes" : [
               "Lima",
               "Madrid",
               "Bogota"
            ],
            "tags" : ["test"]
        }});
    })

    it("Should return 200 with an valid token and requesting next game", async () => {
        const response = await request(app)
            .post('/api/game/next')
            .send({ token: validToken });

        expect(response.statusCode).toBe(200);
    })

    it("Should return 400 with an valid token and requesting awnser game", async () => {
        const response = await request(app)
            .post('/api/game/awnser')
            .send({ token: validToken });

        expect(response.statusCode).toBe(400);
    })

    it("Should return 200 with an valid token and requesting awnser game", async () => {
        const response = await request(app)
            .post('/api/game/update')
            .send({ token: validToken });

        expect(response.statusCode).toBe(200);
    })


    it("Should return 200 with an valid token and requesting new game", async () => {
        const response = await request(app)
            .post('/api/game/new')
            .send({ token: validToken, tags: "test"});

        expect(response.statusCode).toBe(200);
    })

    it("Should return 200 with an valid token and requesting next awnser", async () => {
        const response = await request(app)
            .post('/api/game/next')
            .send({ token: validToken });

        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe("Cual es la capital de Chile");
        expect(response.body.awnsers.length).toBe(4);
    })

    it("Should return 200 with an valid token and requesting update", async () => {
        const response = await request(app)
            .post('/api/game/update')
            .send({ token: validToken });

        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe("Cual es la capital de Chile");
        expect(response.body.awnsers.length).toBe(4);
        expect(response.body.created).toMatch(/\d*/);
        expect(response.body.duration).toMatch(/\d*/);
    })

    it("Should return 200 with an valid token and sending awnser", async () => {
        const response = await request(app)
            .post('/api/game/awnser')
            .send({ token: validToken, awnser: "Santiago" });

        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("Santiago");
    })

    it("Should return 200 with an valid token", async () =>
    {
        const response = await request(app)
            .post('/api/game/settings')
            .send({ token: validToken });

        expect(response.statusCode).toBe(200);
    });

    it("Should return 200 with an valid token", async () =>
    {
        const response = await request(app)
            .post('/api/game/getHistory')
            .send({ token: validToken });

        expect(response.statusCode).toBe(200);
    });


})