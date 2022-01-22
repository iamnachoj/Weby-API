# Weby-API
 Weby app API server

## Weby Social Network
A Social network that is secure, reliable and simple. Weby: your social media app

## End-points
### Users
- POST /signup - create a new user. (needs json object with keys: name, email and password).
- POST /signin - authenticates an user, and creates a jwt + a 't' cookie. (needs json object with keys: email and password).
- GET /signout - eliminates cookie 't' that gets generated with signin endpoint.
- GET /users - gets all users' names.
- GET /users/:userId - gets specific user (needs auth).
- PUT /users/:userId - updates user (needs auth + same user. Doesn't require all fields, just the ones to be changed).
- DELETE /users/:userId - removes user (needs auth + same user).

### Posts
- GET /posts - get all posts.
- GET /posts/:postId - get specific post.
- GET /posts/by/:UserId - get all posts from user (id).
- POST /posts/new/:UserId - create a new post (needs auth)(needs form system).
- DELETE /posts/delete/:postId - removes post (needs auth + same user who posted).
- PUT /posts/:postId - updates post (needs auth + same user who posted).

