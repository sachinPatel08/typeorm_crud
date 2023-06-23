const express = require('express')
const app = express()
const user = require('./controller/User.controller')
import "reflect-metadata";
import {createConnection} from "typeorm";
const dotenv = require('dotenv')
const route = require('./router/routes')
const rateLimit = require('express-rate-limit')
const post = require('./controller/Post.controller')
const auth = require('./middleware/auth')

dotenv.config();

const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})


createConnection().then(async connection => {

    app.use(express.json());
    app.use(limiter)
    // register all application routes
    // app.get('/user',user.getUser)
    app.use('/v1',route)
    // run app
    app.listen(3000);

    console.log("Express application is up and running on port 3000");

}).catch(error => console.log("TypeORM connection error: ", error));

// myDataSource
// .initialize()
// .then(async () => {
//     console.log("Data Source has been initialized!")
//     app.get('/user',user.getUser)
//     })
//     .catch((err) => {
//         console.error("Error during Data Source initialization:", err)
//     })



// app.listen(5000 , ()=>{
//     console.log('listening on port 5000')
// })