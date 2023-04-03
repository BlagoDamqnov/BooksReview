const sql = require('mssql')
const {obj } = require('../Queries')

let connectionStringData = {
    server: 'DESKTOP-PQSULQS\\SQLEXPRESS',
    database: 'BooksReview',
    user: 'sa',
    password: 'denev123',
    options: {"trustServerCertificate": true}
}

async function connectWithMSSQLDatabase() {
    try{
        await sql.connect(connectionStringData)
       Object.values(obj).forEach(async query => {
        try {
            await sql.query(query);
        } catch (error) {
          return 'Already existing'
        }
       })
        
        console.log('Successfully connected with the database')
    }
    catch(err)
    {
        console.log(err)
    }
}
connectWithMSSQLDatabase()