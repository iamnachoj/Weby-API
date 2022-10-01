# Weby-API
 Weby app Back end server

## Weby Social Network
A Social network that is secure, reliable and simple. Weby: your social media app. 

## Why is Weby different?
Weby is a Social network application that stays off the beaten track: no reels, no extra ads, not trying to call for your attention. It serves just one purpose: keeping track on your friends and family (which it's ultimately the purpose of a Social network). Completely free: sign up, create your profile, follow your friends and see what they are up to!

It has been built using NodeJS, Express + MongoDB, and following the best practices and methodologies of the mentioned tools. 

## Getting Started

The easiest way to get started is to clone the repository:

1. Clone the repository ``Git clone https://github.com/iamnachoj/Weby-API/``
2. Change directory ``cd Weby-API``
3. Install NPM dependencies ``npm install``
6. Start the server ``npm run dev``
   Note: It is recommended to install nodemon for live reloading - It watches for any changes in your node.js app and automatically restarts the server
   Side Note: to run full app locally with my own Weby-Client, you will also need to clone repository <a href="https://github.com/iamnachoj/Weby-Client"> Weby Client </a>, and run ``npm start`` on a different terminal while starting already the API

## End-points
### Users
- POST /signup - create a new user. (needs json object with keys: name, email and password).
- POST /signin - authenticates an user, and creates a jwt + a 't' cookie. (needs json object with keys: email and password).
- GET /signout - eliminates cookie 't' that gets generated with signin endpoint.
- GET /users - gets all users' names.
- GET /users/:userId - gets specific user (needs auth).
- PUT /users/edit/:userId - updates user (needs auth + same user. Doesn't require all fields, just the ones to be changed).
- DELETE /users/delete/:userId - removes user (needs auth + same user).
- PUT /users/follow": "starts following specific user (needs auth).
- PUT /users/unfollow": "unfollow specific user (needs auth).

### Posts
- GET /posts - get all posts.
- GET /posts/:postId - get specific post.
- GET /posts/by/:UserId - get all posts from user (id).
- POST /posts/new/:UserId - create a new post (needs auth)(needs form system).
- DELETE /posts/delete/:postId - removes post (needs auth + same user who posted).
- PUT /posts/edit/:postId - updates post (needs auth + same user who posted).

