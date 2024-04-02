const wikiQuery = require("./wikiUtils/wikidata");

// Function to extract three different random fake answers from an array of elements
const extractRandomFake = (array, selector, answer) => {
    // Pick three random elements from the array
    let elements = pickRandomElements(array, 3);

    // Check if any of the selected elements matches the correct answer
    for (let i = 0; i < elements.length; i++) {
        if (answer === elements[i][formatSelector(selector)]) {
            // If any element matches, recursively call the function to find another fake answer
            return extractRandomFake(array, selector, answer);
        }
    }

    // Check if the selected fake answers are all different from each other
    let fakeAnswers = elements.map(element => element[formatSelector(selector)]);
    if (new Set(fakeAnswers).size !== 3) {
        // If the fake answers are not all different, recursively call the function to find another set of fake answers
        return extractRandomFake(array, selector, answer);
    }

    // Return an array of three selected elements as fake answers
    return fakeAnswers;
}

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
        if (json[field].match(/Q\d*/)) {
            return false;
        }
    }
    return true;
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
    let elements = pickRandomElements(formattedAnswers, 1);

    // Extract selectors from the template question
    let selectors = template.question.match(/<([^<>]+)>/g);
    let finalTitle = template.question;

    // Replace placeholders in the final title with actual data
    if (selectors)
        selectors.forEach(selector => {
            finalTitle = finalTitle.replace(
                selector,
                elements[0][formatSelector(selector)]
            );
        });

    // Retrieve the correct answer
    let answer = elements[0][formatSelector(template.selector)];

    // Generate three different fake answers
    let fakeAnswers = extractRandomFake(formattedAnswers, template.selector, answer);

    // Return the processed template object
    // Define the base template object
    let processedTemplate = {
        "title": finalTitle, // Final title with placeholders replaced
        "answer": answer, // Correct answer
        "fake": fakeAnswers, // Three different fake answers
        "tags": template.tags // Associated tags
    };
    
    // If an image URL is specified in the template, add it to the processed template object
    if (template.imageurl !== undefined) {
        processedTemplate.imgurl = elements[0][formatSelector(template.imageurl)];
    }

    // Return the processed template object
    return processedTemplate;
}

module.exports = processTemplate;