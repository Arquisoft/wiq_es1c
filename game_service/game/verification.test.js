const axios = require('axios');
const { validate, getCurrentQuestion, requestQuestion } = require('./verification');

jest.mock('axios');

describe('Utils Functions', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should validate required fields', () => {
    const req = {
      body: {
        field1: 'value1',
        field2: 'value2',
      },
    };
    const requiredFields = ['field1', 'field2'];

    const result = validate(req, requiredFields);

    expect(result).toBe(true);
  });

  it('should not validate missing required fields', () => {
    const req = {
      body: {
        field1: 'value1',
      },
    };
    const requiredFields = ['field1', 'field2'];

    const result = validate(req, requiredFields);

    expect(result).toBe(false);
  });

  it('should get current question', async () => {
    const mockUser = {
      getGames: jest.fn().mockResolvedValueOnce([{ getQuestions: jest.fn().mockResolvedValueOnce([{ user_answer: null }]) }]),
    };

    const result = await getCurrentQuestion(mockUser);

    expect(result).not.toBeNull();
  });

  it('should return null if no games', async () => {
    const mockUser = {
        getGames: () => [
            {
                getQuestions: jest.fn().mockResolvedValueOnce([])
            }
        ]  
    };

    const result = await getCurrentQuestion(mockUser);

    expect(result).toBeNull();
  });

  it('should return null if no questions', async () => {
    const mockUser = {
      getGames: jest.fn().mockResolvedValueOnce([]),
    };

    const result = await getCurrentQuestion(mockUser);

    expect(result).toBeNull();
  });

  it('should return null if user_answer is not null', async () => {
    const mockUser = {
      getGames: jest.fn().mockResolvedValueOnce([{ getQuestions: jest.fn().mockResolvedValueOnce([{ user_answer: 'answered' }]) }]),
    };

    const result = await getCurrentQuestion(mockUser);

    expect(result).toBeNull();
  });

  it('should request a question', async () => {
    const mockQuestionResponse = {
      data: {
        title: 'Sample Question',
        awnser: 'Correct Answer',
        imageUrl: "",
        fake: ['Fake 1', 'Fake 2', 'Fake 3'],
      },
    };
    axios.post.mockResolvedValueOnce(mockQuestionResponse);

    const result = await requestQuestion();

    expect(result).toEqual({
      title: 'Sample Question',
      awnser: 'Correct Answer',
      imageUrl: "",
      fake: ['Fake 1', 'Fake 2', 'Fake 3'],
    });
  });
});
