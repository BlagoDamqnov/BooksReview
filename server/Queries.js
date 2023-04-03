let sql = require('mssql')
const bcrypt = require('bcrypt');
const { inputValidate } = require('./Validations');

async function isLiked(bookId,userId){
    let result =await sql.query(`SELECT * FROM Likes Where BookId = ${bookId} AND UserId = ${userId}`)
    return result.recordset;
}
async function likeBook(bookId,userId){
    await sql.query `UPDATE Books SET [Like] = [Like] + 1 WHERE Id = ${bookId}
                     INSERT INTO dbo.Likes(BookId,UserId) VALUES (${bookId},${userId})`
}
async function deleteBookById(bookId) {
    await sql.query(`DELETE FROM Books WHERE Id = ${bookId}`);
}
async function getBookByUserId(userId){
    let result = await sql.query `SELECT * FROM Books WHERE userId = ${userId}`;
    return result.recordset;
}
async function getUserByUsername(username){
    let result = await sql.query `SELECT Id FROM Users WHERE Username = ${username}`;
    return result;
}
async function getUserById(userId){
    let result = await sql.query `SELECT * FROM Users WHERE Id = ${userId}`;
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
    let regex = new RegExp(inputValidate);
    const isValid = regex.test(input);
    if(!isValid){
        let result = await sql.query(`SELECT * FROM dbo.Books WHERE Title = N'${input}' OR Kind = N'${input}' OR Author = N'${input}' OR Title LIKE N'%${input}%' OR Kind LIKE N'%${input}%' OR Author LIKE N'%${input}%' `,{
                input: sql.NVarChar,
                value: input
        });
        return result.recordset;
    }else{
        return [];
    }
}
async function getBook(){
    let result = await sql.query `SELECT TOP(10) * FROM Books ORDER BY [Like] DESC`
    return result.recordset;
}
async function UserExist(email){
    let result = await sql.query`SELECT * FROM dbo.Users WHERE Email = ${email}`
    return result
}
async function registerUser(accessToken,email, password,username,img)
{
    let hashedPass = await bcrypt.hash(password, 10)
    await sql.query`INSERT INTO dbo.Users(Email,Password,Username,Image) VALUES(${email}, ${hashedPass},${username},${img})`
}
async function updateUsername(userId,username){
    await sql.query`UPDATE dbo.Users SET Username = ${username} WHERE Id=${userId}`
}
async function updateEmail(userId,email){
    await sql.query`UPDATE dbo.Users SET Email = ${email} WHERE Id=${userId}`
}
async function updateImage(image,userId){
    await sql.query`UPDATE dbo.Users SET [Image] = ${image} WHERE Id = ${userId} `;
}
async function getFavoriteBooks(userId){
    let books = await sql.query`SELECT * FROM Books b
    JOIN Likes l ON b.Id = l.BookId
    WHERE l.UserId = ${userId}`;

    return books.recordset;
}
async function removeFavoriteBooks(userId,bookId){
    await sql.query`DELETE FROM Likes WHERE BookId = ${bookId} AND UserId = ${userId}
                    UPDATE Books SET [Like] -=1 WHERE Id = ${bookId}`;
}
async function deleteProfile(userId){
    await sql.query`
    BEGIN TRANSACTION
    DELETE
    FROM  dbo.Likes
    WHERE  UserId = ${userId}

    DELETE
    FROM  dbo.Books
    WHERE  UserId = ${userId}

    DELETE
    FROM  dbo.Users
    WHERE  Id = ${userId}
    COMMIT;
    `
}

 var obj = {
    users: `CREATE TABLE BooksReview.dbo.Users (
    Id int IDENTITY(1,1) NOT NULL,
    Email varchar(150) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
    Username nvarchar(150) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
    Password varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
    Image nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
    CONSTRAINT PK__Users__3214EC07E2A37D06 PRIMARY KEY (Id),
    CONSTRAINT UQ__Users__536C85E4EB76C4CD UNIQUE (Username),
    CONSTRAINT UQ__Users__A9D105343234C0D3 UNIQUE (Email)
);`  ,
    books:`CREATE TABLE BooksReview.dbo.Books (
    Id int IDENTITY(1,1) NOT NULL,
    Title nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
    Kind nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
    Author nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
    Review nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
    [Image] nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
    UserId int NOT NULL,
    [Like] int DEFAULT 0 NULL,
    DataCreated datetime NULL,
    CONSTRAINT PK__Books__3214EC07A157F92A PRIMARY KEY (Id)
);`,
    likes:`CREATE TABLE BooksReview.dbo.Likes (
    BookId int NULL,
    UserId int NULL
);
`}
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
    ,getUserById
    ,updateUsername
    ,deleteProfile
    ,updateEmail
    ,getUserByUsername
    ,updateImage
    ,getFavoriteBooks
    ,removeFavoriteBooks
    ,obj
}

