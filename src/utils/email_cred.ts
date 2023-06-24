const dotenv = require('dotenv');
dotenv.config()
module.exports = {
    gmail:process.env.GMAIL,
    pass:process.env.GMAIL_PASS
}


