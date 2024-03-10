const WikiUtils = require("../wikiUtils/wiki-utils")



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
    async () => {
        let min =-363;
        let max =6170;
        const element = await WikiUtils.getRandomElement()
        return {
            "title": `Cuál es la temperatura de fusión del ${element.name}`,
            "awnser": element.melting,
            "fake" : [
               await WikiUtils.getRandomTemperaturWithExclude(min,max,element.melting),
               await WikiUtils.getRandomTemperaturWithExclude(min,max,element.melting),
               await WikiUtils.getRandomTemperaturWithExclude(min,max,element.melting)
            ]
        }
    },
    async () => {
        let min =-307;
        let max =10701;
        const element = await WikiUtils.getRandomElement()
        return {
            "title": `Cuál es la temperatura de ebullición del ${element.name}`,
            "awnser": element.boiling,
            "fake" : [
               await WikiUtils.getRandomTemperaturWithExclude(min,max,element.boiling),
               await WikiUtils.getRandomTemperaturWithExclude(min,max,element.boiling),
               await WikiUtils.getRandomTemperaturWithExclude(min,max,element.boiling)
            ]
        }
    },
    
]

module.exports = () => templates[Math.floor(Math.random()*templates.length)]()