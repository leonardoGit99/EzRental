const { config } = require('dotenv')
config()

module.exports = {
    db: {
        urldatabase: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    }
}