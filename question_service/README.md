# Question generation API

## How to use

To use the app simply send a GET request to port _23123_ with the format /generate, the response will follow the following format:

```json
{
  "title": "question goes here",
  "imageUrl": "url of image goes here OPTIONAL",
  "awnser": "true anwser goes here",
  "fake": ["these", "are", "fake"]
}
```

---

## Developer Zone!

### How to add more templates

To add a new template simply add the to the apropiate generator inside /questionGenerators

**\*NOTE:** Please keep in mind the existing types of questions (Geography)\*

The generator **must** be an async function that returns the generated question in the apropiate format

### Wikidata

The file wikidata.js exposes a function to call wikidata using SPARQL to find the necessary information for the questions, you **dont** have to worry about doing the same query multiple times as the function has an builtin cache.
