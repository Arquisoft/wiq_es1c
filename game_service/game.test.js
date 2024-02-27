const request = require('supertest')
const axios = require('axios')
const app = require("./game")
const User = require("./db/models/user")
const Sync = require("./db/sync")

beforeAll(async () => {
    await Sync();
    await User.create({
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
        return {
            "title": `Cual es la capital de Chile`,
            "awnser": 'Santiago',
            "fake" : [
               "Lima",
               "Madrid",
               "Bogota"
            ]
        }
    })

    it("Should return 403 with an invalid token", async () => {
        const response = await request(app)
            .post('/api/game/new')
            .send({ token: "NotValid!" });

        expect(response.statusCode).toBe(401);
    })
})