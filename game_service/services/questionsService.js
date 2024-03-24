const Question = require("../db/mongo/schema/Question");
const { requestQuestion } = require("../game/verification");

const NUM_QUESTIONS = 100;

const loadQuestion = async() =>
{
    const res = await Question.aggregate().sample(1);
        
    const { _id, __v, createdAt, ...question } = res[0];

    return question;
}

const saveQuestion = async() =>
{
    const res = await requestQuestion();

    const question = new Question({
        title: res.title,
        answer: res.answer,
        fakes: [res.fake[0], res.fake[1], res.fake[2]],
        imageUrl: res.imgurl,
        tags: res.tags
    });

    question.save();
}

const loadInitialQuestions = () =>
{
    for (let i = 0; i < 9; i++)
        setTimeout(async () => await saveQuestionsInDB(), 1000);
}

const saveQuestionsInDB = async () =>
{
    const questions = await Question.find({});

    if (questions.length > 1000)
        return;

    for (let i = 0; i < NUM_QUESTIONS; i++)
        await saveQuestion();
}

const deleteOlderQuestions = async () =>
{
    const questionsToRemove = await Question.find({}, {_id: 1})
        .limit(NUM_QUESTIONS)
        .sort({ createdAt: 'ascending' });

    await Question.deleteMany({ _id: {$in: questionsToRemove} });
}

module.exports = { loadQuestion, loadInitialQuestions, saveQuestionsInDB, deleteOlderQuestions };