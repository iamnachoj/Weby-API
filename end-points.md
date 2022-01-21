** END POINTS DOCS

GET /posts                === get all posts
GET /posts/by/:UserId     === get all posts from user (id)
POST /posts/new/:UserId   === create a new post (needs auth)
POST /signup              === create a new user. (needs json object with keys: name, email and password)
POST /signin              === authenticates an user, and creates a jwt + a "t" cookie. (needs json object with keys: email and password)
GET /signout              === eliminates cookie "t" that gets generated with signin endpoint.
GET /users                === gets all users' names
GET /users/:userId        === gets specific user (needs auth)
PUT /users/:userId        === updates user (needs auth. Doesn't require all the req.body fields to be completed, just the ones to be changed)
DELETE /users/:userId     === removes user (needs auth)