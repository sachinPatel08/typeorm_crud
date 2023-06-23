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

route.post('/api/users/post',auth,post.createPost)

route.post('/api/users/comment' , auth , comment.postComment)
route.get('/api/users/comment/:id',auth,comment.getCommentByPost)

route.get('/api/users/post',auth , post.getAllPost)


module.exports = route;