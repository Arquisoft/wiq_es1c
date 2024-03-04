const { mockRequest, mockResponse, mockNext } = require('jest-mock-req-res');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./authMiddleware'); // Replace with the actual path to your auth middleware module

const privateKey = "ChangeMePlease!!!!"

jest.mock('jsonwebtoken'); // Mocking the jwt module

describe('authMiddleware', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call next() for a valid token', () => {
    const req = mockRequest({
      body: {
        token: 'validToken',
      },
    });
    const res = mockResponse();
    const next = jest.fn();

    jwt.verify.mockImplementation(() => {});

    authMiddleware(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith(req.body.token, privateKey);
    expect(next).toHaveBeenCalled();
  });

  it('should respond with 401 for missing required fields', () => {
    const req = mockRequest({
      body: {},
    });
    const res = mockResponse();
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  it('should respond with 401 for invalid token', () => {
    const req = mockRequest({
      body: {
        token: 'invalidToken',
      },
    });
    const res = mockResponse();
    const next = jest.fn();

    jwt.verify.mockImplementation(() => {
      throw new Error('Invalid token');
    });

    authMiddleware(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith(req.body.token, privateKey);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });
});