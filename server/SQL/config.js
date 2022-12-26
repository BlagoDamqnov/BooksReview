const sql = require('mssql')

let connectionStringData = {
    server: 'DESKTOP-PQSULQS\\SQLEXPRESS',
    database: 'BooksReview',
    user: 'sa',
    password: 'denev123',
    options: {"trustServerCertificate": true}
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