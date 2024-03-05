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
}

module.exports = WikiUtils