const wikidata = require("./wikidata");

const rand = (array) => array[Math.floor(Math.random()*array.length)]

class WikiUtils {
    
    static async getRandomCountry() {
        const query = `
            SELECT ?countryLabel ?capitalLabel ?population WHERE {
                ?country wdt:P31 wd:Q6256.
                ?country wdt:P36 ?capital.
                ?country wdt:P1082 ?population.
                SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
            }
        `;
    
        const results = rand(await wikidata(query));
    
        return {
            name: results['countryLabel'],
            capital: results['capitalLabel'],
            population: results['population'],
        };
    }
    static async getRandomCountryWithExclude(excludeCountry) {
        let randomCountry = await this.getRandomCountry();
    
        while (randomCountry === excludeCountry || /^Q[0-9]*/.test(randomCountry)) {
            randomCountry = await this.getRandomCountry();
        }
        return randomCountry;
    }
    static async getRandomCity() {
        const query = `
          SELECT ?cityLabel WHERE {
            ?city wdt:P31 wd:Q515.
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
          } ORDER BY ?cityLabel
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
        return (Math.floor(Math.random()*100) + 40)*1000000
    }

    static getRandomPopulationExclude(exclude) {
        let pop = this.getRandomPopulation()

        while(pop == exclude){
            pop = this.getRandomPopulation();
        }

        return pop
    }
    static async getRandomFlagAndCountry() {
        const query = `
            SELECT ?bandera ?banderaLabel ?pais ?paisLabel WHERE {
                ?pais wdt:P31 wd:Q6256; # Países
                    wdt:P41 ?bandera. # Propiedad para la bandera
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
            SELECT ?obra ?obraLabel ?autor ?autorLabel ?imagen ?ubicacion ?ubicacionLabel WHERE {
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
        };
    }
    static async getRandomSpanishAuthor() {
        const query = `
            SELECT DISTINCT ?autor ?autorLabel WHERE {
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

    
}

module.exports = WikiUtils