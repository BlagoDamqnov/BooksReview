let sql = require('mssql')

async function isLiked(bookId,userId){
    let result =await sql.query(`SELECT * FROM Likes Where BookId = ${bookId} AND UserId = ${userId}`)
    return result.recordset;
}
async function likeBook(bookId,userId){
    await sql.query `UPDATE Books SET [Like] = [Like] + 1 WHERE Id = ${bookId}
                     INSERT INTO dbo.Likes(BookId,UserId) VALUES (${bookId},${userId})`;
}
async function deleteBookById(bookId) {
    await sql.query(`DELETE FROM Books WHERE Id = ${bookId}`);
}
async function getBookByUserId(userId){
    let result = await sql.query `SELECT * FROM Books WHERE userId = ${userId}`;
    return result.recordset;
}


async function editBookById(bookId,title,kind,author,review,img){
 await sql.query `UPDATE Books SET Title = ${title}, Kind = ${kind}, Author =${author} ,Review = ${review}, Image = ${img} WHERE Id = ${bookId}`;
}
async function getBookByBookId(bookId){
    let result = await sql.query `SELECT * FROM Books WHERE Id = ${bookId}`;
    return result.recordset;
}
async function createReview(title,author,review,kind,img,userId){
    let result = await sql.query `
    INSERT INTO dbo.Books(Title,Kind,Author,Review,Image,UserId,DataCreated) VALUES (${title},${kind},${author},${review},${img},${userId},GETDATE())`;
}
async function getUserByEmail(email){
    let result = await sql.query
    `SELECT Id FROM dbo.Users WHERE Email=${email}`
    return result.recordset;
}
async function searchBook(input){
    let result = await sql.query `SELECT * FROM dbo.Books WHERE Title = ${input} OR Kind = ${input} OR Author = ${input}`;
    return result.recordset;
}
async function getBook(){
    let result = await sql.query `SELECT TOP(5) * FROM Books ORDER BY [Like] DESC`
    return result.recordset;
}
async function UserExist(email){
    let result = await sql.query`SELECT * FROM dbo.Users WHERE Email = ${email}`
    return result
}
async function registerUser(accessToken,email, password,username)
{
    let hashedPass = await bcrypt.hash(password, 10)
    await sql.query`INSERT INTO dbo.Users(Email,Password,Username) VALUES(${email}, ${hashedPass},${username})`
}

module.exports = {
    isLiked
    ,likeBook
    ,deleteBookById
    ,getBookByUserId
    ,editBookById
    ,getBookByBookId
    ,createReview
    ,getUserByEmail
    ,searchBook
    ,getBook
    ,UserExist
    ,registerUser
}