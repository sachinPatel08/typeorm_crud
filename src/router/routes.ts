const express = require('express');
const route = express.Router()
const auth = require('../middleware/auth')
const user = require('../controller/User.controller')
const post = require('../controller/Post.controller')
const comment = require('../controller/Comment.controller')


route.get('/api/users',auth,user.getUser)
route.post('/api/users',user.createUser)
route.post('/api/users/login',user.login)
route.delete('/api/users/logout',auth,user.logout)
route.get('/api/users/all/:id',auth , user.getUserById)
route.get('/api/users/verify/:id', user.verifyUser)

route.post('/api/users/post',auth,post.createPost)
route.get('/api/users/postWithUseraAndComment',auth , post.getPostWithComment)
route.get('/api/users/post',auth , post.getAllPost)

route.post('/api/users/comment' , auth , comment.postComment)
route.get('/api/users/comment/:id',auth,comment.getCommentByPost)


module.exports = route;