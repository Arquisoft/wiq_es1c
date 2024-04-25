const request = require('supertest')
const app = require("./question")

jest.mock('./db/mongo/utils', () => ({
    getRandomTemplate: () => { return Promise.resolve({
        question: "Quién es el director de la película: <filmLabel>",
        selector: "<directorLabel>",
        tags: ["film", "text"],
        lang: "es",
        query: "SELECT DISTINCT ?filmLabel ?directorLabel WHERE { ?film wdt:P31 wd:Q11424. ?film wdt:P57 ?director. SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE],es\". } }LIMIT 100"
    })},
    getAllTags: () => { return Promise.resolve(
        ["Galleta","Chocapic"]
    )}
}));

// Mock the fetch function
global.fetch = jest.fn().mockResolvedValue({
    ok: true, // Define the 'ok' property
    json: async () => ({
        results: {
            bindings: [
                { filmLabel: { value: "Pulp Fiction" }, directorLabel: { value: "Quentin Tarantino" } },
                { filmLabel: { value: "Inception" }, directorLabel: { value: "Christopher Nolan" } },
                { filmLabel: { value: "The Shawshank Redemption" }, directorLabel: { value: "Frank Darabont" } },
                { filmLabel: { value: "The Godfather" }, directorLabel: { value: "Francis Ford Coppola" } },
                { filmLabel: { value: "The Dark Knight" }, directorLabel: { value: "Christopher Nolan" } },
                { filmLabel: { value: "Fight Club" }, directorLabel: { value: "David Fincher" } },
                { filmLabel: { value: "Forrest Gump" }, directorLabel: { value: "Robert Zemeckis" } },
                { filmLabel: { value: "The Matrix" }, directorLabel: { value: "Lana Wachowski" } }
            ]
        }
    })
});

// Import Chance library for random number generation
const Chance = require('chance')

// Create an object to store instances of Chance library for different seeds
const chances = {}

// Create a mock Math object
const mockMath = Object.create(Math)

// Override Math.random method to return values generated using Chance library based on a seed
mockMath.random = (seed = 42) => {
    chances[seed] = chances[seed] || new Chance(seed)
    const chance = chances[seed]
    return chance.random()
}

// Assign the modified Math object to global scope
global.Math = mockMath

afterAll(() => {
    app.close();
})

// Describe the test suite for processTemplate function
describe('Question app', () => {
    // Test case for processTemplate function
    it('Should process the template and return formatted data', async () => {
        // Mocked data for getRandomTemplate response

        
        const response = await request(app)
            .post('/api/questions/generate')
            .send();

        expect(response.statusCode).toBe(200);
        
        console.log(response)
        // Call the function
        const result = response.body;

        // Assertions
        expect(result.title).toBe("Quién es el director de la película: The Matrix");
        expect(result.answer).toBe("Lana Wachowski");
        expect(result.fake).toHaveLength(3);
        expect(result.tags).toEqual(["film", "text"]);
    });

    it('Should return the correct tags', async () => {
        // Mocked data for getRandomTemplate response

        
        const response = await request(app)
            .post('/api/questions/tags')
            .send();

        expect(response.statusCode).toBe(200);
        
        console.log(response)
        // Call the function
        const result = response.body;

        // Assertions
        expect(result[0]).toBe("Galleta");
        expect(result[1]).toBe("Chocapic");
        expect(result.length).toBe(2);
    });
});
