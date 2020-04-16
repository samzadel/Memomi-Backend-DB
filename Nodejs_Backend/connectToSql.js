const sql = require('mssql/msnodesqlv8')

const poolPromise = new sql.ConnectionPool({
      server: "LAPTOP-G7A1FT2J",
      database: "Memomi",
      options: {
        trustedConnection: true
      }
    })

const poolConnect = poolPromise.connect()

module.exports = {poolConnect}

