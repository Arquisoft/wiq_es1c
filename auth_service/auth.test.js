const request = require('supertest');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = require("./auth");
const { User } = require("./models");

// Mock private key for JWT
const privateKey = "ChangeMePlease!!!!";

// Mock user data for testing
const mockUser = {
    name: "testuser",
    password: "testpassword"
};

beforeEach(async () => {
    
    // Clear the User table before each test
    await User.destroy({ where: {} });

    // Hash the password and create a new user
    const hashedPassword = await bcrypt.hash(mockUser.password, 15);
    await User.create({
        id: 1,
        name: mockUser.name,
        password: hashedPassword
    });
});

describe('Authentication Endpoints', () => {
    it("Should register a new user", async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({ username: "newuser", password: "newpassword" });

        expect(response.statusCode).toBe(201);
        expect(response.body.token).toBeDefined();
    });

    it("Should return error if trying to register with existing username", async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({ username: mockUser.name, password: "newpassword" });

        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBe("Nombre de usuario no disponible");
    });

    it("Should return error if trying to register without username or password", async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({});

        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Usuario o contraseña incorrectos");
    });

    it("Should login with correct credentials", async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({ username: mockUser.name, password: mockUser.password });

        expect(response.statusCode).toBe(200);
        expect(response.body.token).toBeDefined();
    });

    it("Should return error if login with incorrect credentials", async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({ username: "incorrectuser", password: "incorrectpassword" });

        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Usuario o contraseña incorrectos");
    });

    it("Should return error if login only with incorrect password", async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({ username: mockUser.name, password: "incorrectpassword" });

        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Usuario o contraseña incorrectos");
    });

    it("Should return error if login without username or password", async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({});

        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Usuario o contraseña incorrectos");
    });

    it("Should return 401 if token is missing in verify endpoint", async () => {
        const response = await request(app)
            .post('/api/auth/verify');

        expect(response.statusCode).toBe(401);
    });

    it("Should return 401 if token is invalid in verify endpoint", async () => {
        const response = await request(app)
            .post('/api/auth/verify')
            .send({ token: "invalidtoken" });

        expect(response.statusCode).toBe(401);
    });

    it("Should return 200 if token is valid in verify endpoint", async () => {
        // Generate token for the mock user
        const token = jwt.sign({ user_id: 1 }, privateKey);

        const response = await request(app)
            .post('/api/auth/verify')
            .send({ token: token });

        expect(response.statusCode).toBe(200);
    });

    it("Should return 200 with username if token is valid in getUsername endpoint", async () => {
        // Generate token for the mock user
        const token = jwt.sign({ user_id: 1 }, privateKey);

        const response = await request(app)
            .post('/api/auth/getName')
            .send({ token: token });

        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe(mockUser.name);
    });

    it("Should return 200 and the users", async() =>{

        await User.create({
            id: 2,
            name: 'prueba2',
            password: 'contraseña2'
        });

        const response = await request(app)
            .get('/api/user/getUsers');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([{name: 'testuser', id:1},{name: 'prueba2',id:2}]);
    });

    it("Should return 200 and the mocked user",async()=>{
        const response = await request(app)
            .get('/api/user/getUser')
            .query({user_id:1});
        expect(response.statusCode).toBe(200);
        expect(response.body.user.name).toEqual(mockUser.name)

    });

    it("Should return 401 because the user doesn't exist",async()=>{
        const response = await request(app)
            .get('/api/user/getUser')
            .query({user_id:2});
        expect(response.statusCode).toBe(401);

    });

    it("Should return 401 because it needs a parameter",async()=>{
        const response = await request(app)
            .get('/api/user/getUser')
        expect(response.statusCode).toBe(401);

    });

    it("Shoud return 200 and delete the user",async()=>{
        const response = await request(app)
            .post('/api/user/deleteUser')
            .query({user_id:1});
        expect(response.statusCode).toBe(200);

        //try to find the deleted user
        const response2 = await request(app)
            .get('/api/user/getUser')
            .query({user_id:1});
        expect(response2.statusCode).toBe(401);
    });

    it("Shoud return 401 because it needs a parameter in delete",async()=>{
        const response = await request(app)
            .post('/api/user/deleteUser')
        expect(response.statusCode).toBe(401);
    });

    it("Shoud return 401 because the user doesn't exist in delete",async()=>{
        console.log('este')
        const response = await request(app)
            .post('/api/user/deleteUser')
            .query({user_id:8});
        expect(response.statusCode).toBe(401);
    });

});
