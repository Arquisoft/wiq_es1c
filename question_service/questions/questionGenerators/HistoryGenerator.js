const WikiUtils = require("../wikiUtils/wiki-utils")
const templates = [
    async () => {
        const artWork = await WikiUtils.getRandomArtWorkAndAuthor()
        return {
            "title": `Quien es el autor de ${artWork.artWork} que está en ${artWork.ubication}`,
            "imageUrl": artWork.image,
            "awnser": artWork.author,
            "fake" : [
               (await WikiUtils.getRandomSpanishAuthorWithExclude(artWork.author)).author,
               (await WikiUtils.getRandomSpanishAuthorWithExclude(artWork.author)).author,
               (await WikiUtils.getRandomSpanishAuthorWithExclude(artWork.author)).author,
            ]
        }  
    },
    async () => {
        return {
            "title": `Pregunta gratis`,
            "awnser": " correcta",
            "fake" : [
               "invalida",
               "invalida",
               "invalida",
            ]
        }  
    },
]

module.exports = () => templates[Math.floor(Math.random()*templates.length)]()