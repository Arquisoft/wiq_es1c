const wikidata = require("./wikidata");

const rand = (array) => array[Math.floor(Math.random()*array.length)]

class WikiUtils {
    
    static async getRandomCountry() {
        const query = `
            SELECT ?countryLabel ?capitalLabel ?population ?language WHERE {
                ?country wdt:P31 wd:Q6256.
                ?country wdt:P36 ?capital.
                ?country wdt:P1082 ?population.
                ?country wtd:37 ?language
                SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
            }
        `;
    
        const results = rand(await wikidata(query));
    
        return {
            name: results['countryLabel'],
            capital: results['capitalLabel'],
            population: results['population'],
            language: results['language'],
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

    static async getRandomLanguage(){
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

        while(lan == exclude || /^Q[0-9]*/.test(lan)){
            lan = this.getRandomLanguage();
        }

        return lan
    }

    static async getRandomElement(){
        const query=`SELECT ?elementLabel ?symbol WHERE {
            ?element wdt:P31 wd:Q11344.
            ?element wdt:P1086 ?symbol.
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
          }`;

          const results = rand(await wikidata(query));

          return {
            name: results['elementLabel'],
            symbol: results['symbol'],
        };
    }

    static async getRandomElementSymbol(){
        const query=`SELECT ?symbol WHERE {
            ?element wdt:P31 wd:Q11344.
            ?element wdt:P1086 ?symbol.
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
          }`;
           
          return rand(await wikidata(query))['symbol'];

    }

    static async getRandomElementSymbolWithExclude(excludeSymbol) {
        let randomSymbol = await this.getRandomElement();
    
        while (randomSymbol === excludeSymbol || /^Q[0-9]*/.test(randomSymbol)) {
            randomSymbol = await this.getRandomElement();
        }
    
        return randomSymbol;
    }


    
}

module.exports = WikiUtils