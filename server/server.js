const express = require('express');
const cors = require('cors');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
let mssql_configuration = require('../server/SQL/config.js');

const {  isLiked,likeBook,deleteBookById,getBookByUserId,editBookById,getBookByBookId,createReview,getUserByEmail
        ,searchBook,getBook,UserExist,registerUser, getUserById, updateUsername, deleteProfile} = require('./Queries.js');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3030;

app.listen(PORT);

app.post('/users/login', async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    const data = {email:email,password:password};
        let user = await (await UserExist(email)).recordset;

    try {
        let username = user[0].Username;
        let img = user[0].Image;

        if(user.length!==0)
        { 
            let match =  await bcrypt.compare(password,user[0].Password);

            if(match){
                const token = jwt.sign(data,'eds5f4sd5f4sdfsd4f45sd54fds4f54sd45');
                const id = await getUserByEmail(email);

                res.send({email,token,id,username,img});
            }else{
                res.status(409).json({
                    message:'Passwords do not match'
                })
            }
        }
        else{
            res.status(404).json({message:'This user does not exist.'})
        }
    }catch (error) {
        res.status(409).json({
            message:'User not found'
        })
    }
})

app.post('/users/register',async (req,res)=>{
    const email = await req.body.email;
    const password = await req.body.password;
    const username = await req.body.username;
    const img = await req.body.img;

    let user = (await UserExist(email)).recordset;

    const data = {email:email,password:password};
    
    if(user.length !== 0)
    {
        res.status(409).json({
            message:'This User is already exist'
        })
    }else{
        const token = jwt.sign(data,'eds5f4sd5f4sdfsd4f45sd54fds4f54sd45');

        await registerUser(token,email, password,username,img);

        const id = await getUserByEmail(email);
        res.send({email,token,id,username,img});
        }
})

app.get('/users/logout',(req,res)=>{
    res.status(204).json('Successfully logout!');
})

app.get('/data/books',async (req,res) =>{
     let books = await getBook();
     res.status(200).send(books);
})

app.get('/data/books/:id',async (req,res) =>{
    let books = await getBookByUserId(req.params.id);
    res.status(200).send(books);
})

app.get(`/data/books/find/:title`,async(req,res) =>{
    let result = await searchBook(req.params.title);
    res.status(200).send(result);
})

app.post('/data/create',async(req,res)=>{
    const title = await req.body.title;
    const author = await req.body.author;
    const review = await req.body.review;
    const kind = await req.body.kind;
    const img = await req.body.img;
    const userId = await req.body.userId;

    let books = await createReview(title,author,review,kind,img,userId);
    res.send(books);
})

app.post('/data/book/like/:id',async(req,res) => {
   await likeBook(req.params.id,req.body.userId);
   res.status(204);
});

app.post('/data/book/like',async(req,res) => {
   let result = await isLiked(req.body.bookId,req.body.userId);
   res.status(200).send(result);
})

app.put('/data/edit/:id',async(req,res)=>{
    const title = await req.body.title;
    const author = await req.body.author;
    const review = await req.body.review;
    const kind = await req.body.kind;
    const img = await req.body.img;
    const bookId = await req.params.id;

    let books = await editBookById(bookId,title,kind,author,review,img);
    res.status(200).send(books);
})

app.get('/data/details/:id',async (req, res)=>{
    let books = await getBookByBookId(req.params.id);
    res.status(200).send(books);
})

app.delete('/data/delete/:id',async (req, res)=>{
    await deleteBookById(req.params.id);
})

app.get('/data/users/:id',async (req, res)=>{
    let result = await getUserById(req.params.id);
    res.status(200).send(result);
})

app.put('/data/update/username/:id',async (req, res)=>{
    const userId = await req.params.id;
    const username = await req.body.username;

    await updateUsername(userId,username);
})

app.delete('/data/users/delete/:id',async (req, res)=>{
    const userId = await req.params.id;

    await deleteProfile(userId);
    res.status(200).send({message: 'User deleted successfully'})
});