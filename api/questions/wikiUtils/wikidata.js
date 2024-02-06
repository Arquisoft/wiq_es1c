async function query(SPARQL) {
    const apiUrl = `https://query.wikidata.org/sparql?query=${encodeURIComponent(SPARQL)}&format=json`;

    const response = await fetch(apiUrl, {
        headers: {
            'Accept': 'application/json',
            'User-Agent': 'QuestionCrawler/1.0 (UO288991@uniovi.es)'
        }
    });

    if (!response.ok) {
        console.error('Error al realizar la consulta a Wikidata:', response.statusText);
        return;
    }

    const datos = await response.json();

    const resultados = datos.results.bindings.map((resultado) => {
        const resultadoFormateado = {};
        Object.keys(resultado).forEach((clave) => {
            resultadoFormateado[clave] = resultado[clave].value;
        });

        return resultadoFormateado
    });

    return resultados
}

const surroundWithCache = (func) => {
    let cache = {}

    return (param) => {
        if(param in cache) {
            return cache[param]
        }

        let res = func(param)

        cache[param] = res

        return res
    }
}

module.exports = surroundWithCache(query);