const WikiUtils = require("../wikiUtils/wiki-utils")

const templates = [
    async () => {
        const film = await WikiUtils.getRandomFilm()
        return {
            "title": `Quién es el director de la película: ${film.name}`,
            "awnser": film.director,
            "fake" : [
               await WikiUtils.getRandomDirectorWithExclude(film.director),
               await WikiUtils.getRandomDirectorWithExclude(film.director),
               await WikiUtils.getRandomDirectorWithExclude(film.director)
            ]
        }
    },
    async () => {
        const film = await WikiUtils.getRandomFilm()
        return {
            "title": `En qué fecha se entrenó la película: ${film.name}`,
            "awnser": film.release,
            "fake" : [
               await WikiUtils.getRandomReleaseWithExclude(film.release),
               await WikiUtils.getRandomReleaseWithExclude(film.release),
               await WikiUtils.getRandomReleaseWithExclude(film.release)
            ]
        }
    },
    async () => {
        const film = await WikiUtils.getRandomFilm()
        return {
            "title": `Cuál es el tema principal de la película: ${film.name}`,
            "awnser": film.plot,
            "fake" : [
               await WikiUtils.getRandomPlotWithExclude(film.plot),
               await WikiUtils.getRandomPlotWithExclude(film.plot),
               await WikiUtils.getRandomPlotWithExclude(film.plot),
            ]
        }
    },
]

module.exports = () => templates[Math.floor(Math.random()*templates.length)]()