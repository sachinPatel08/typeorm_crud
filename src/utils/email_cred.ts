const dotenv = require('dotenv');
dotenv.config()
dotenv.load()
module.exports = {
    gmail:process.env.GMAIL,
    pass:process.env.GMAIL_PASS
}
