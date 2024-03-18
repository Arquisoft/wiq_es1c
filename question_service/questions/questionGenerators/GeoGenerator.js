const WikiUtils = require("../wikiUtils/wiki-utils")

const templates = [
    async () => {
        const country = await WikiUtils.getRandomCountry()
        return {
            "title": `Cual es la poblacion de ${country.name}`,
            "awnser": WikiUtils.formatNumber(country.population),
            "fake" : [
               WikiUtils.getRandomPopulationExclude(country.population),
               WikiUtils.getRandomPopulationExclude(country.population),
               WikiUtils.getRandomPopulationExclude(country.population)
            ]
        }
    },
    async () => {
        const country = await WikiUtils.getRandomCountry()
        return {
            "title": `Cual es la capital de ${country.name}`,
            "awnser": country.capital,
            "fake" : [
               await WikiUtils.getRandomCityWithExclude(country.capital),
               await WikiUtils.getRandomCityWithExclude(country.capital),
               await WikiUtils.getRandomCityWithExclude(country.capital)
            ]
        }
    },
    async () => {
        const country = await WikiUtils.getRandomFlagAndCountry()
        return {
            "title": `Cual es el pais de esta bandera `,
            "imageUrl": country.flag,
            "awnser": country.name,
            "fake" : [
               (await WikiUtils.getRandomCountryWithExclude(country.name)).name,
               (await WikiUtils.getRandomCountryWithExclude(country.name)).name,
               (await WikiUtils.getRandomCountryWithExclude(country.name)).name
            ]

        }
    },
    async () => {
        const country = await WikiUtils.getRandomCountry()
        return {
            "title": `Qué idioma se habla en ${country.name}?`,
            "awnser": country.language,
            "fake" : [
               await WikiUtils.getRandomLanguageExclude(country.language),
               await WikiUtils.getRandomLanguageExclude(country.language),
               await WikiUtils.getRandomLanguageExclude(country.language)
            ]
        }
    },
]

module.exports = () => templates[Math.floor(Math.random()*templates.length)]()
