const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const templateSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    selector: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    lang: {
        type: String,
        required: true
    },
    query: {
        type: String,
        required: true
    },
    imageurl: {
        type: String,
        required: false
    },
});

const Template = mongoose.model('Template', templateSchema);

module.exports = Template;
