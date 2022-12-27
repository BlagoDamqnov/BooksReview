const express = require('express');
const cors = require('cors');
const jwt = require("jsonwebtoken");
let sql = require('mssql')
const bcrypt = require('bcrypt');
let mssql_configuration = require('../server/SQL/config.js');


const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3030;
app.post('/users/login', async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    const data = {email:email,password:password};
        let user = await (await UserExist(email)).recordset;
        if(user.length!==0)
        { 
          
            let match =  await bcrypt.compare(password,user[0].Password);
            if(match){
                const token = jwt.sign(data,'eds5f4sd5f4sdfsd4f45sd54fds4f54sd45');
                const id = await getUserByEmail(email);
                res.send({email,token,id});
                console.log(id);
            }else{
                res.status(409).json({
                    message:'Passwords do not match'
                })
            }
        }
        else
        {
            res.status(404).json({message:'This user does not exist.'})
        }
        
})

app.post('/users/register',async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    let user = (await UserExist(email)).recordset;
    const data = {email:email,password:password};
    
    if(user.length !== 0)
    {
        res.status(409).json({
            message:'This User is already exist'
        })
    }else{
        const token = jwt.sign(data,'eds5f4sd5f4sdfsd4f45sd54fds4f54sd45');
        await registerUser(token,email, password)
        const id = await getUserByEmail(email);
        res.send({email,token,id});
         console.log(id);
        }
})

app.get('/users/logout',(req,res)=>{
    res.status(200).json('Successfully logout!');
})

app.get('/data/books',async (req,res) =>{
    let books = await getBook();
    res.status(200).send(books);
    console.log(books);
})
app.get('/data/books/:id',async (req,res) =>{
    let books = await getBookByUserId(req.params.id);
    res.status(200).send(books);
})
app.get(`/data/books/search/:key`,async(req,res) =>{
    let books = await searchBook(req.params.key);
    res.status(200).send(books);
})

app.post('/data/create',async(req,res)=>{
    const title = await req.body.title;
    const author = await req.body.author;
    const review = await req.body.review;
    const kind = await req.body.kind;
    const img = await req.body.img;
    const userId = await req.body.userId;
    await createReview(title,author,review,kind,img,userId);
})
app.put('/data/edit/:id',async(req,res)=>{
    const title = await req.body.title;
    const author = await req.body.author;
    const review = await req.body.review;
    const kind = await req.body.kind;
    const img = await req.body.img;
    const bookId = await req.params.id;
    await editBookById(bookId,title,kind,author,review,img);
})
app.get('/data/details/:id',async (req, res)=>{
    let books = await getBookByBookId(req.params.id);
    res.status(200).send(books);
   
})
app.delete('/data/delete/:id',async (req, res)=>{
    await deleteBookById(req.params.id);
})
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
    INSERT INTO dbo.Books(Title,Kind,Author,Review,Image,UserId) VALUES (${title},${kind},${author},${review},${img},${userId})`;
}
async function getUserByEmail(email){
    let result = await sql.query
    `SELECT Id FROM dbo.Users WHERE Email=${email}`
    return result.recordset;
}
async function searchBook(title){
    let result = await sql.query `SELECT * FROM dbo.Books WHERE Title = ${title}`;
    return result.recordset;
}
async function getBook(){
    let result = await sql.query `SELECT * FROM dbo.Books`
    return result.recordset;
}
async function UserExist(email){
    let result = await sql.query`SELECT * FROM dbo.Users WHERE Email = ${email}`
    return result
}
async function registerUser(accessToken,email, password)
{
    let hashedPass = await bcrypt.hash(password, 10)
    await sql.query`INSERT INTO dbo.Users(Email,Password) VALUES(${email}, ${hashedPass})`
    
}

app.listen(PORT,()=>console.log('Hello'));