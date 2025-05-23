const {Pool} = require('pg')
const {db} = require('./config')

const pool = new Pool({
    connectionString: db.urldatabase,
})

module.exports = pool;