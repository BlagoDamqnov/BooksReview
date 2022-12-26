const sql = require('mssql')
import * as config from '../SQL/serverConfig.env'
// you should be able to get the following data from your connection string
let connectionStringData = {
    server: config.SERVER,
    database: config.DATABASE,
    user: config.USER,
    password:config.PASSWORD,
    options: config.OPTIONS
}

async function connectWithMSSQLDatabase() {
    try{
        sql.connect(connectionStringData)
        console.log('successfully connected with the database')
    }
    catch(err)
    {
        console.log(err)
    }
}
connectWithMSSQLDatabase()