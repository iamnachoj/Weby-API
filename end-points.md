** END POINTS DOCS

GET /               === require posts (needs authenticated user)
POST /post          === create a new post
POST /signup        === create a new user. (needs json object with keys: name, email and password)
POST /signin        === authenticates an user, and creates a jwt + a "t" cookie. (needs json object with keys: email and password)
GET /signout        === eliminates cookie "t" that gets generated with signin endpoint.
GET /users          === gets all users' names
GET /users/:userId  === gets specific user (needs authenticated user)