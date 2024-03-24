const wikiQuery = require("./wikiUtils/wikidata")

const formatSelector = (selector) => {
    return selector.replace("<","").replace(">","")
}

const formatFields = (json) => {
    for(field in json) {
        if (json[field].match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/)) {
            json[field] = new Date(json[field]).toLocaleString("es-ES").split(",")[0]; 
        }
    }
    return json;
}

const pickRandomElements = (array, count) => {
    const shuffledArray = array.sort(() => Math.random() - 0.5);
    return shuffledArray.slice(0, count);
}

const verifyFields = (json) => {
    for(field in json) {
        if(field.match(/Q*/)){
            return true;
        }
    }
    return false;
}


const processTemplate = async(template) => {
    // Get the posible awnsers
    let awnserArray = await wikiQuery(template.query);

    // Filter bad data
    let filteredAwnsers = awnserArray.filter(verifyFields);
    
    // Format dates, if any
    let formated = filteredAwnsers.map(formatFields);

    // Pick four
    let elems = pickRandomElements(formated, 4);

    let selectors = template.question.match(/<([^<>]+)>/g);
    let finaltitle = template.question;

    selectors.forEach(selector => {
        finaltitle = finaltitle.replace(
            selector, 
            elems[0][formatSelector(selector)]
        );
    });

    return {
        "title": finaltitle,
        "awnser": elems[0][formatSelector(template.selector)],
        "fake" : [
            elems[1][formatSelector(template.selector)],
            elems[2][formatSelector(template.selector)],
            elems[3][formatSelector(template.selector)]
        ],
        "tags": template.tags
    }
}

module.exports = processTemplate;