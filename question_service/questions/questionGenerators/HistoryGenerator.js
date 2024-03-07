const WikiUtils = require("../wikiUtils/wiki-utils")
const templates = [
    async () => {
        const artWork = await WikiUtils.getRandomArtWorkAndAuthor()
        return {
            "title": `Quien es el autor de ${artWork.obraLabel} que está en ${artWork.ubicacionLabel}`,
            "awnser": artWork.authorLabel,
            "fake" : [
               await WikiUtils.getRandomSpanishAuthorWithExclude(artWork.authorLabel),
               await WikiUtils.getRandomSpanishAuthorWithExclude(artWork.authorLabel),
               await WikiUtils.getRandomSpanishAuthorWithExclude(artWork.authorLabel)
            ]
        }
    },
]

module.exports = () => templates[Math.floor(Math.random()*templates.length)]()