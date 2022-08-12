// change filename to connection.js and input your local postgres user information to enable database access
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'pizzaowner',
  host: 'localhost',
  database: 'pizzashack',
  password: 'pepperoni',
  port: 5432
})

module.exports = {pool: pool}