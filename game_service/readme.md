# Game API documentation
***Important**: App is listening on port 8003*
## New game endpoint
### URL
```
/api/game/new
```
### How to use
Needs the token for authentication, no further parameters required, it creates a new game. 

*returns 200 Ok on success.*

Example request:
```json
{
    "token":"eyDVhZGFkODgtMjUyiaWTQQ8" 
}
```
## Next question endpoint
### URL
```
/api/game/next
```
### How to use
Needs the token for authentication, no further parameters required, it creates a new question.


*returns 200 Ok and the question on success.*

Example request:
```json
{
    "token":"eyDVhZGFkODgtMjUyiaWTQQ8"
}
```
Example awnser:
```json
{
	"title": "Cual es la capital de Kosovo",
	"awnsers": [
		"Pristina",
		"Yantzaza",
		"Florencia",
		"Arzew"
	]
}
```

## Update question endpoint
### URL
```
/api/game/update
```
### How to use
Needs the token for authentication, no further parameters required, it gives the data of the current question.

*returns 200 Ok and the question on success.*

Example request:
```json
{
    "token":"eyDVhZGFkODgtMjUyiaWTQQ8"
}
```
Example awnser:
```json
{
	"title": "Cual es la capital de Kosovo",
	"awnsers": [
		"Pristina",
		"Yantzaza",
		"Florencia",
		"Arzew"
	],
    // This params can and should be used to calculate the remaining time
	"created": "1708527343000", //These are UNIXMILIS, use current UNIXMILIS to know the remaining time.
	"duration": "20" //Duration of the question in seconds
```
## Awnser question endpoint
### URL
```
/api/game/awnser
```
### How to use
Needs the token for authentication and the awnser of the question, it gives back the correct awnser.

*returns 200 Ok and the awnser on success.*

Example request:
```json
{
    "token":"eyDVhZGFkODgtMjUyiaWTQQ8",
    "awnser": "Arzew"
}
```
Example awnser:
```json
Pristina
```