const wikidata = require("./wikidata");

const rand = (array) => array[Math.floor(Math.random() * array.length)]

class WikiUtils {

    static async getRandomCountry() {
        const query = `
            SELECT ?countryLabel ?capitalLabel ?population ?languageLabel WHERE {
                ?country wdt:P31 wd:Q6256.
                ?country wdt:P36 ?capital.
                ?country wdt:P1082 ?population.
                ?country wdt:P37 ?language
                SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
            }
        `;

        const results = rand(await wikidata(query));

        return {
            name: results['countryLabel'],
            capital: results['capitalLabel'],
            population: results['population'],
            language: results['languageLabel'],
        };
    }

    static async getRandomCountryWithExclude(excludeCountry) {
        let randomCountry = await this.getRandomCountry();

        while (randomCountry.name === excludeCountry.name || /^Q[0-9]*/.test(randomCountry.name)) {
            randomCountry = await this.getRandomCountry();
        }
        return randomCountry;
    }

    static async getRandomCity() {
        const query = `
          SELECT ?cityLabel WHERE {
            ?city wdt:P31 wd:Q515.
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
          }
        `;
        return rand(await wikidata(query))['cityLabel'];
    }

    static async getRandomCityWithExclude(excludeCity) {
        let randomCity = await this.getRandomCity();

        while (randomCity === excludeCity || /^Q[0-9]*/.test(randomCity)) {
            randomCity = await this.getRandomCity();
        }
        return randomCity;
    }

    static getRandomPopulation() {
        return Math.floor(Math.random() * 100000000) 
    }

    static getRandomPopulationExclude(exclude) {
        let pop = this.getRandomPopulation()

        while (pop == exclude) {
            pop = this.getRandomPopulation();
        }

        return pop
    }

    static async getRandomFlagAndCountry() {
        const query = `
            SELECT ?flag ?flagLabel ?country ?countryLabel WHERE {
                ?country wdt:P31 wd:Q6256; # Countries
                    wdt:P41 ?flag. # Property for flag
                SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
            }
        `;
        const results = rand(await wikidata(query));
        return {
            name: results['countryLabel'],
            flag: results['flagLabel'],
        };
    }

    static async getRandomArtWorkAndAuthor() {
        const query = `
            SELECT ?obra ?obraLabel ?autor ?autorLabel ?imagen ?imagenLabel ?ubicacion ?ubicacionLabel WHERE {
                ?obra wdt:P31 wd:Q3305213;       # Obras de arte
                    wdt:P170 ?autor;           # Propiedad de autor
                    wdt:P495 wd:Q29;           # Obras de arte europeas
                    wdt:P18 ?imagen;           # Propiedad de imagen
                    wdt:P195 ?ubicacion.       # Propiedad de ubicación (donde está expuesta)
                SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
            }
         `;
        const results = rand(await wikidata(query));
        return {
            author: results['autorLabel'],
            artWork: results['obraLabel'],
            ubication: results['ubicacionLabel'],
            image: results['imagenLabel']
        };
    }

    static async getRandomSpanishAuthor() {
        const query = `
            SELECT DISTINCT ?autorLabel WHERE {
                ?obra wdt:P31 wd:Q3305213;       # Obras de arte
                    wdt:P170 ?autor;           # Propiedad de autor
                    wdt:P495 wd:Q29.           # Obras de arte europeas
                ?autor wdt:P27 wd:Q29.           # Nacionalidad española
                SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
            }
         `;
        const results = rand(await wikidata(query));
        return {
            author: results['autorLabel']
        };
    }

    static async getRandomSpanishAuthorWithExclude(excludeAuthor) {
        let randomSpanishAuthor = await this.getRandomSpanishAuthor();

        while (randomSpanishAuthor === excludeAuthor || /^Q[0-9]*/.test(randomSpanishAuthor)) {
            randomSpanishAuthor = await this.getRandomSpanishAuthor();
        }
        return randomSpanishAuthor;
    }

    static async getRandomLanguage() {
        const query = `
        SELECT ?languageLabel  WHERE {
            ?country wdt:P31 wd:Q6256.
            ?country wdt:P37 ?language.
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
        }
    `;

        return rand(await wikidata(query))['languageLabel'];
    }

    static getRandomLanguageExclude(exclude) {
        let lan = this.getRandomLanguage()

        while (lan == exclude || /^Q[0-9]*/.test(lan)) {
            lan = this.getRandomLanguage();
        }

        return lan
    }

    static async getRandomElement() {
        const query = `SELECT ?elementLabel ?symbol ?melting ?boiling WHERE {
            ?element wdt:P31 wd:Q11344.
            ?element wdt:P246 ?symbol.
            ?element wdt:P2101 ?melting.
            ?element wdt:P2102 ?boiling.
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
          }`;

        const results = rand(await wikidata(query));

        return {
            name: results['elementLabel'],
            symbol: results['symbol'],
            melting: results['melting'],
            boiling: results['boiling'],

        };
    }

    static async getRandomElementSymbol() {
        const query = `SELECT ?symbol WHERE {
            ?element wdt:P31 wd:Q11344.
            ?element wdt:P246 ?symbol.
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
          }`;

        return rand(await wikidata(query))['symbol'];

    }

    static async getRandomElementSymbolWithExclude(excludeSymbol) {
        let randomSymbol = await this.getRandomElementSymbol();

        while (randomSymbol === excludeSymbol || /^Q[0-9]*/.test(randomSymbol)) {
            randomSymbol = await this.getRandomElementSymbol();
        }

        return randomSymbol;
    }

    static getRandomTemperature(min, max) {

        const numeroDecimal = Math.random() * (max - min) + min;
        return parseFloat(numeroDecimal.toFixed(1));
    }

    static getRandomTemperaturWithExclude(exclude) {
        const threshold = 0.5;
        let min = exclude * threshold;
        let max = exclude * (threshold + 1);
        let number = this.getRandomTemperature(min, max)

        while (number == exclude) {
            number = this.getRandomTemperature(min, max);
        }

        return number
    }

    static async getRandomFilm() {
        const query = `SELECT DISTINCT ?filmLabel ?directorLabel ?release ?plotLabel WHERE {
            ?film wdt:P31 wd:Q11424.
            ?film wdt:P57 ?director.
            ?film wdt:P577 ?release.
            ?film wdt:P921 ?plot
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
          }LIMIT 100`;

        const results = rand(await wikidata(query));

        return {
            name: results['filmLabel'],
            director: results['directorLabel'],
            release: results['release'],
            plot: results['plotLabel'],

        };
    }

    static async getRandomDirector() {
        const query = `SELECT DISTINCT ?filmLabel ?directorLabel WHERE {
            ?film wdt:P31 wd:Q11424.
            ?film wdt:P57 ?director.
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
          }LIMIT 100`;

        return rand(await wikidata(query))['directorLabel'];
    }

    static async getRandomDirectorWithExclude(excludeDirector) {
        let randomDirector = await this.getRandomDirector();

        while (randomDirector === excludeDirector || /^Q[0-9]*/.test(randomDirector)) {
            randomDirector = await this.getRandomDirector();
        }

        return randomDirector;
    }

    static async getRandomRelease() {
        const query = `SELECT DISTINCT ?filmLabel ?release WHERE {
            ?film wdt:P31 wd:Q11424.
            ?film wdt:P577 ?release.
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
          }LIMIT 100`;

        return rand(await wikidata(query))['release'];
    }

    static async getRandomReleaseWithExclude(excludeRelease) {
        let randomRelease = await this.getRandomRelease();

        while (randomRelease === excludeRelease || /^Q[0-9]*/.test(randomRelease)) {
            randomRelease = await this.getRandomRelease();
        }

        return randomRelease;
    }

    static async getRandomPlot() {
        const query = `SELECT DISTINCT ?filmLabel ?plotLabel WHERE {
            ?film wdt:P31 wd:Q11424.
            ?film wdt:P921 ?plot.
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
          }LIMIT 100`;

        return rand(await wikidata(query))['plotLabel'];
    }

    static async getRandomPlotWithExclude(excludePlot) {
        let randomPlot = await this.getRandomPlot();

        while (randomPlot === excludePlot || /^Q[0-9]*/.test(randomPlot)) {
            randomPlot = await this.getRandomPlot();
        }

        return randomPlot;
    }
}

module.exports = WikiUtils