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
        const query=`SELECT ?elementLabel ?symbol ?melting ?boiling WHERE {
            ?element wdt:P31 wd:Q11344.
            ?element wdt:P246 ?symbol.
            ?element wdt:P2101 ?melting.
            ?element wdt:P2102 ?boiling.
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
          }`;

          const results = rand(await wikidata(query));

          return {
            name: results['elementLabel'],
            symbol: results['symbol'],
            melting: results['melting'],
            boiling: results['boiling'],

        };
    }

    static async getRandomElementSymbol(){
        const query=`SELECT ?symbol WHERE {
            ?element wdt:P31 wd:Q11344.
            ?element wdt:P246 ?symbol.
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

    static getRandomTemperature(min, max) {

        const numeroDecimal = Math.random() * (max - min) + min;
        return parseFloat(numeroDecimal.toFixed(1));
      }

      static getRandomTemperaturWithExclude(min, max,exclude) {

        let number = this.getRandomPopulation(min,max)

        while(number == exclude){
            number = this.getRandomPopulation(min,max);
        }

        return number
      }

      static async getRandomFilm(){
        const query=`SELECT DISTINCT ?filmLabel ?directorLabel ?release ?plotLabel WHERE {
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

      static async getRandomDirector(){
        const query=`SELECT DISTINCT ?filmLabel ?directorLabel WHERE {
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

    static async getRandomRelease(){
        const query=`SELECT DISTINCT ?filmLabel ?release WHERE {
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
    
        return randomDirector;
    }

    static async getRandomPlot(){
        const query=`SELECT DISTINCT ?filmLabel ?plotLabel WHERE {
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