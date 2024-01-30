# Question generation API

## How to use
To use the app simply send a GET request to port *23123* with the format /generate, the response will follow the following format: 

```json
{
    "title" : "question goes here",
    "awnser" : "true anwser goes here",
    "fake" : [
        "these",
        "are",
        "fake"
    ]
}
```