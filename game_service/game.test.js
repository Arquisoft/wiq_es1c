const request = require('supertest')
const axios = require('axios')
const app = require("./game")
const User = require("./db/models/user")
const Sync = require("./db/sync")

const validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMSJ9.EGt29l9IqmFPQmV7_tFILwo6l8d5zBk6CSz2o15hv4U"

beforeAll(async () => {
    await Sync();
    await User.create({
        id: 1,
        name: "Jazz",
        password: "meow"
    });
}) 

afterAll(async () => {
    app.close();
})

jest.mock('axios')

describe('Game Service', () => {
    axios.post.mockImplementation((url,data) => {
        return Promise.resolve({ data: {
            "title": `Cual es la capital de Chile`,
            "awnser": 'Santiago',
            "fake" : [
               "Lima",
               "Madrid",
               "Bogota"
            ]
        }});
    })

    it("Should return 403 with an invalid token", async () => {
        const response = await request(app)
            .post('/api/game/new')
            .send({ token: "NotValid!" });

        expect(response.statusCode).toBe(401);
    })

    it("Should return 400 with an valid token and requesting next game", async () => {
        const response = await request(app)
            .post('/api/game/next')
            .send({ token: validToken });

        expect(response.statusCode).toBe(400);
    })

    it("Should return 400 with an valid token and requesting awnser game", async () => {
        const response = await request(app)
            .post('/api/game/awnser')
            .send({ token: validToken });

        expect(response.statusCode).toBe(400);
    })

    it("Should return 400 with an valid token and requesting awnser game", async () => {
        const response = await request(app)
            .post('/api/game/update')
            .send({ token: validToken });

        expect(response.statusCode).toBe(400);
    })


    it("Should return 200 with an valid token and requesting new game", async () => {
        const response = await request(app)
            .post('/api/game/new')
            .send({ token: validToken });

        expect(response.statusCode).toBe(200);
    })

    it("Should return 200 with an valid token and requesting next awnser", async () => {
        const response = await request(app)
            .post('/api/game/next')
            .send({ token: validToken });

        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe("Cual es la capital de Chile");
        expect(response.body.awnsers.length).toBe(4);
        expect(response.body.awnsers[0]).toBe("Santiago");
        expect(response.body.awnsers[1]).toBe("Lima");
        expect(response.body.awnsers[2]).toBe("Madrid");
        expect(response.body.awnsers[3]).toBe("Bogota");
    })

    it("Should return 200 with an valid token and requesting update", async () => {
        const response = await request(app)
            .post('/api/game/update')
            .send({ token: validToken });

        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe("Cual es la capital de Chile");
        expect(response.body.awnsers.length).toBe(4);
        expect(response.body.awnsers[0]).toBe("Santiago");
        expect(response.body.awnsers[1]).toBe("Lima");
        expect(response.body.awnsers[2]).toBe("Madrid");
        expect(response.body.awnsers[3]).toBe("Bogota");
        expect(response.body.created).toMatch(/\d*/);
        expect(response.body.duration).toMatch(/\d*/);
    })

    it("Should return 200 with an valid token and sending awnser", async () => {
        const response = await request(app)
            .post('/api/game/awnser')
            .send({ token: validToken, awnser: "Santiago" });
            console.log(response)

        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("Santiago");
    })
})