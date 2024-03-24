const wikiQuery = require("./wikiUtils/wikidata");

// Function to format the selector by removing "<" and ">"
const formatSelector = (selector) => {
    return selector.replace("<", "").replace(">", "");
}

// Function to format date fields in the JSON
const formatFields = (json) => {
    for (field in json) {
        if (json[field].match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/)) {
            json[field] = new Date(json[field]).toLocaleString("es-ES").split(",")[0];
        }
    }
    return json;
}

// Function to pick random elements from an array
const pickRandomElements = (array, count) => {
    const shuffledArray = array.sort(() => Math.random() - 0.5);
    return shuffledArray.slice(0, count);
}

// Function to verify fields with 'Q' prefix in the JSON
const verifyFields = (json) => {
    for (field in json) {
        if (field.match(/Q*/)) {
            return true;
        }
    }
    return false;
}

// Function to process the template asynchronously
const processTemplate = async (template) => {
    // Get the possible answers
    let answerArray = await wikiQuery(template.query);

    // Filter out bad data
    let filteredAnswers = answerArray.filter(verifyFields);

    // Format dates in the answers, if any
    let formattedAnswers = filteredAnswers.map(formatFields);

    // Pick four random elements
    let elements = pickRandomElements(formattedAnswers, 4);

    // Extract selectors from the template question
    let selectors = template.question.match(/<([^<>]+)>/g);
    let finalTitle = template.question;

    // Replace selectors in the question template with actual data
    selectors.forEach(selector => {
        finalTitle = finalTitle.replace(
            selector,
            elements[0][formatSelector(selector)]
        );
    });

    return {
        "title": finalTitle,
        "answer": elements[0][formatSelector(template.selector)],
        "fake": [
            elements[1][formatSelector(template.selector)],
            elements[2][formatSelector(template.selector)],
            elements[3][formatSelector(template.selector)]
        ],
        "tags": template.tags
    }
}

module.exports = processTemplate;