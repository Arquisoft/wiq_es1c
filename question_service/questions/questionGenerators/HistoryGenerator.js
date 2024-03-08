const WikiUtils = require("../wikiUtils/wiki-utils")
const templates = [
    async () => {
        const artWork = await WikiUtils.getRandomArtWorkAndAuthor()
        return {
            "title": `Quien es el autor de ${artWork.image} ${artWork.artWork} que está en ${artWork.ubication}`,
            "awnser": artWork.author,
            "fake" : [
               await WikiUtils.getRandomSpanishAuthorWithExclude(artWork.author),
               await WikiUtils.getRandomSpanishAuthorWithExclude(artWork.author),
               await WikiUtils.getRandomSpanishAuthorWithExclude(artWork.author)
            ]
        }
    },
]

module.exports = () => templates[Math.floor(Math.random()*templates.length)]()