const { mockRequest, mockResponse } = require('jest-mock-req-res');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { login, register, verify } = require('./authEndpoints'); // replace with the actual module path
const user = require('../db/models/user')

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('login function', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should respond with a token for valid credentials', async () => {
    const req = mockRequest({
      body: {
        username: 'validUser',
        password: 'validPassword',
      },
    });
    const res = mockResponse();

    const mockedUser = {
      id: 1,
      name: 'validUser',
      password: bcrypt.hashSync('validPassword', 10),
    };

    // Mocking Sequelize's findOne method
    jest.spyOn(user, 'findOne').mockResolvedValue(mockedUser);

    // Mocking bcrypt's compareSync method
    bcrypt.compareSync.mockReturnValue(true);

    // Mocking jwt's sign method
    jwt.sign.mockReturnValue('mockedToken');

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token: 'mockedToken' });
    expect(res.send).toHaveBeenCalled();
  });

  it('should respond with 401 for invalid credentials (wrong password)', async () => {
    const req = mockRequest({
      body: {
        username: 'invalidUser',
        password: 'invalidPassword',
      },
    });
    const res = mockResponse();

    // Mocking Sequelize's findOne method
    jest.spyOn(user, 'findOne').mockResolvedValue({
        username: 'user',
        password: 'pass',
    });

    // Mocking bcrypt's compareSync method
    bcrypt.compareSync.mockReturnValue(false);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalled();
  });

  it('should respond with 401 for invalid credentials (wrong username)', async () => {
    const req = mockRequest({
      body: {
        username: 'invalidUser',
        password: 'invalidPassword',
      },
    });
    const res = mockResponse();

    // Mocking Sequelize's findOne method
    jest.spyOn(user, 'findOne').mockResolvedValue(undefined);

    // Mocking bcrypt's compareSync method
    bcrypt.compareSync.mockReturnValue(false);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalled();
  });

  it('should respond with 401 for missing required fields', async () => {
    const req = mockRequest({
      body: {},
    });
    const res = mockResponse();

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalled();
  });

  it('should respond with 500 for unexpected errors', async () => {
    const req = mockRequest({
      body: {
        username: 'validUser',
        password: 'validPassword',
      },
    });
    const res = mockResponse();

    // Mocking Sequelize's findOne method to throw an error
    jest.spyOn(user, 'findOne').mockImplementation(() => {
      throw new Error('Unexpected error');
    });

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalled();
  });
});

jest.mock('../db/models/user'); // Mocking the user model

describe('register function', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should respond with 201 for valid registration', async () => {
    const req = mockRequest({
      body: {
        username: 'newUser',
        password: 'newPassword',
      },
    });
    const res = mockResponse();

    // Mocking validateRequiredFields to return true
    user.create.mockResolvedValueOnce({
      name: 'newUser',
      password: 'newPassword',
    });

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalled();
  });

  it('should respond with 200 for repeated username', async () => {
    const req = mockRequest({
      body: {
        username: 'newUser',
        password: 'newPassword',
      },
    });
    const res = mockResponse();

    user.findOne.mockResolvedValueOnce({
      name: 'newUser',
      password: 'newPassword',
    });

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalled();
  });

  it('should respond with 401 for missing required fields', async () => {
    const req = mockRequest({
      body: {},
    });
    const res = mockResponse();

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalled();
  });

  it('should respond with 500 for unexpected errors', async () => {
    const req = mockRequest({
      body: {
        username: 'newUser',
        password: 'newPassword',
      },
    });
    const res = mockResponse();

    // Mocking validateRequiredFields to return true
    user.create.mockImplementation(() => {
      throw new Error('Unexpected error');
    });

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalled();
  });
});

jest.mock('jsonwebtoken'); // Mocking the jwt module

describe('verify function', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should respond with 200 for valid token', async () => {
    const req = mockRequest({
      body: {
        token: 'validToken',
      },
    });
    const res = mockResponse();

    // Mocking validateRequiredFields to return true
    jwt.verify.mockImplementation(() => {
      return {user_id: "something"}
    });

    user.findOne.mockImplementation(() => "user")

    await verify(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalled();
  });

  it('should respond with 401 for missing required fields', async () => {
    const req = mockRequest({
      body: {},
    });
    const res = mockResponse();

    await verify(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalled();
  });

  it('should respond with 401 for invalid token', async () => {
    const req = mockRequest({
      body: {
        token: 'invalidToken',
      },
    });
    const res = mockResponse();

    // Mocking validateRequiredFields to return true
    jwt.verify.mockImplementation(() => {
      throw new Error('Invalid token');
    });

    await verify(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalled();
  });
});