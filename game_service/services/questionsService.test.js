const mongodb = require('../db/mongo/config');
mongodb();
const { loadQuestion, saveQuestionsInDB, deleteOlderQuestions } = require("../services/questionsService");
const axios = require("axios");
const Question = require("../db/mongo/schema/Question");

jest.mock('axios');

describe('Question Service', () => {
    axios.post.mockImplementation((url,data) => {
        return Promise.resolve({data: { 
            "title": `Cual es la capital de Chile`,
            "answer": 'Santiago',
            "fake" : [
               "Lima",
               "Madrid",
               "Bogota"
            ],
            "tags" : ["test"]
        }});
    });

    it("Should save questions in DB", async () => {
        await saveQuestionsInDB(); 

        const questions = await Question.find({});

        expect(questions.length).toBe(100);
    });

    it("Should load a question", async () => {       
        await saveQuestionsInDB(); 
        let question = await loadQuestion(["test"])

        expect(question.title).toBe(`Cual es la capital de Chile`);
    });

    it("Should load a question no tags given", async () => {
        await saveQuestionsInDB(); 
        let question = await loadQuestion([])

        expect(question.title).toBe(`Cual es la capital de Chile`);
    });

    it("Should delete questions in DB", async () => {
        await saveQuestionsInDB(); 
        await deleteOlderQuestions(); 
        await deleteOlderQuestions(); 
        await deleteOlderQuestions(); 
        await deleteOlderQuestions(); 

        const questions = await Question.find({});

        expect(questions.length).toBe(0);
    });
});