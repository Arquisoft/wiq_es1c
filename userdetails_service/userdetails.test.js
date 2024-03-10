const request = require('supertest')
const app = require("./userdetails")
const User = require("./db/models/user")
const Sync = require("./db/sync")

const validToken   = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMSJ9.EGt29l9IqmFPQmV7_tFILwo6l8d5zBk6CSz2o15hv4U"
const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMiJ9.QfftklDZ6jsHhzADmcDUDlReP1476Na2fUK7t1edtXw"

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

describe('userDetails Service', () => {

    it("Should return 400 with an invalid user", async () => {
        const response = await request(app)
            .post('/api/userdetails/name')
            .send({ token: invalidToken });

        expect(response.statusCode).toBe(400);
    })

    it("Should return 403 with an invalid token", async () => {
        const response = await request(app)
            .post('/api/userdetails/name')
            .send({ token: "NotValid!" });

        expect(response.statusCode).toBe(401);
    })

    it("Should return username with an valid token", async () => {
        const response = await request(app)
            .post('/api/userdetails/name')
            .send({ token: validToken });

        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe("Jazz");
    })

    it("History Should return 400 with an invalid user", async () => {
        const response = await request(app)
            .post('/api/userdetails/history')
            .send({ token: invalidToken });

        expect(response.statusCode).toBe(400);
    })

    it("History return 403 with an invalid token", async () => {
        const response = await request(app)
            .post('/api/userdetails/history')
            .send({ token: "NotValid!" });

        expect(response.statusCode).toBe(401);
    })

    it("History return History with an valid token", async () => {
        const response = await request(app)
            .post('/api/userdetails/history')
            .send({ token: validToken });

        expect(response.statusCode).toBe(200);
        expect(String(response.body)).toBe("");
    })
});