const WikiUtils = require("../wikiUtils/wiki-utils")

//más para preguntas mirar el P2101 Y P2102

const templates = [
    async () => {
        const element = await WikiUtils.getRandomElement()
        return {
            "title": `Cuál es la símbolo qúimico de ${element.name}`,
            "awnser": element.symbol,
            "fake" : [
               await WikiUtils.getRandomElementSymbolWithExclude(element.symbol),
               await WikiUtils.getRandomElementSymbolWithExclude(element.symbol),
               await WikiUtils.getRandomElementSymbolWithExclude(element.symbol)
            ]
        }
    },
    
]

module.exports = () => templates[Math.floor(Math.random()*templates.length)]()