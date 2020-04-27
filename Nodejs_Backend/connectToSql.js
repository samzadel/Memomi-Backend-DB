const sql = require('mssql/msnodesqlv8')
const dotenv = require('dotenv');
dotenv.config();

const poolPromise = new sql.ConnectionPool({
      server: process.env.SERVER_NAME,
      database: "Memomi",
      options: {
        trustedConnection: true
      }
    })

const poolConnect = poolPromise.connect()

module.exports = {poolConnect}

