const { Schema, model } = require("mongoose");


const Question = Schema
({
    title: {
        type: String,
        required: true,
        trim: true
    },
    answer: {
        type: String,
        required: true,
        trim: true
    },
    fakes: {
        type: [String],
        required: true
    },
    imageUrl: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

Question.methods.toJSON = function()
{
    const { __v, _id, ...question } = this.toObject();

    question.uid = _id;

    return question;
}

module.exports = model('Question', Question);