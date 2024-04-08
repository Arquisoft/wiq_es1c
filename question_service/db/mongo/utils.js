const Template = require("./schema/Template");

const getAllTags = async() => {
    const result = await Template.find({}, "tags");
    let tags = []
    for (let i = 0; i < result.length; i++) {
        const tagsInTemplate = result[i].tags;
        for(let j = 0; j < tagsInTemplate.length; j++)
            if(!tags.includes(tagsInTemplate[j]))
                tags.push(tagsInTemplate[j]);
    }
    return tags.sort();
}

const getRandomTemplate = async () => {
    // Count the number of documents in the collection
    const count = await Template.countDocuments();

    // Generate a random index within the range of document count
    const randomIndex = Math.floor(Math.random() * count);

    // Perform the aggregation to fetch a random document
    const result = await Template.aggregate([
    { $skip: randomIndex }, // Skip randomIndex documents
    { $limit: 1 } // Limit the result to 1 document
    ]);

    return result[0];
}

const loadInitialTemplates = async () => {
    //Load the templates into the DB
    require("fs").readFile("./templates.json", "utf8", (err, data) => {
        let templates = JSON.parse(data);
    
        templates.forEach(template => {
        //Save it to the DB!
        //Delete old one if extists
        Template.findOneAndDelete({question: template.question});
    
        // Create a new Template instance using the data from the JSON file
        const newTemplate = new Template(template);
    
        // Save the new template to the database
        newTemplate.save();
        });
    });
}

module.exports = {getRandomTemplate, loadInitialTemplates, getAllTags}