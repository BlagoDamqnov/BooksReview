const express = require('express');
const cors = require('cors');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const {  isLiked,likeBook,deleteBookById,getBookByUserId,editBookById,getBookByBookId,createReview,getUserByEmail
        ,searchBook,getBook,UserExist,registerUser, getUserById, updateUsername, deleteProfile,updateEmail,getUserByUsername, updateImage, getFavoriteBooks, removeFavoriteBooks} = require('./Queries.js');
        
let mssql_configuration = require('../server/SQL/config.js');
const {emailRegex,passwordRegex} = require('./Validations');

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

    const isValidPassword = passwordRegex.test(password);
    const isValidEmail = emailRegex.test(email);

    let isExist = (await getUserByUsername(username)).recordset;
  
    if(isExist.length==1){
        res.status(409).json({
            message:'Username is taken'
        })
    }else{
        if(isValidPassword){
            if(!isValidEmail){
                res.status(409).json({
                    message:'You have entered an invalid username or password'
                })
            }else{
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
            }
        }else{
            res.status(409).json({
                message:'Паролата трябва да съдържа малка буква, голяма буква, число и специален символ (например # @ & % *).'
            })
        }
      
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
app.post(`/data/update/image/:id`,async(req,res) =>{
    let image = await req.body.image;

    await updateImage(image,req.params.id);
    res.status(204);
})
app.get('/data/books/favorite/:id',async(req,res) =>{
    const userId = await req.params.id;
    let books = await getFavoriteBooks(userId);

    res.status(200).send(books);
})
app.post('/data/create',async(req,res)=>{
    const title = await req.body.title;
    const author = await req.body.author;
    const review = await req.body.review;
    const kind = await req.body.kind;
    const img = await req.body.img;
    const userId = await req.body.userId;

    let books = await createReview(title,author,review,kind,img,userId);
    res.status(204).send(books);
})

app.post('/data/book/like/:id',async(req,res) => {
   await likeBook(req.params.id,req.body.userId);
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
    res.status(204).send(books);
})

app.delete('/data/book/remove/favorite/:bookId/:userId',async(req,res)=>{
    const userId = req.params.userId;
    const bookId = req.params.bookId;

    await removeFavoriteBooks(userId, bookId);
})

app.get('/data/details/:id',async (req, res)=>{
    let books = await getBookByBookId(req.params.id);
    res.status(200).send(books);
})

app.delete('/data/delete/:id',async (req, res)=>{
    await deleteBookById(req.params.id);
    res.status(200);
})

app.get('/data/books/user/:username',async(req, res)=>{
    let user = req.params.username;
    let userId = await getUserByUsername(user);
    
    res.status(200).send(userId);
})

app.get('/data/users/:id',async (req, res)=>{
    let result = await getUserById(req.params.id);
    res.status(200).send(result);
})

app.put('/data/update/username/:id',async (req, res)=>{
    const userId =  req.params.id;
    const username =  req.body.username;

    const isExist = await getUserByUsername(username);
    const lengthOfResult = isExist.recordset;
   
    if(lengthOfResult.length == 1){
        res.status(409).json({
            message:'User already exists'
        })
    }else{
        await updateUsername(userId,username);
        res.status(204).json({
            message:'Success updated!'
        })
    }
})

app.put('/data/update/email/:id',async (req, res)=>{
    const userId = await req.params.id;
    const email = await req.body.email;

    let user = (await UserExist(email)).recordset;

    if(user.length >=1)
    {
        res.status(409).json({
            message:'This User is already exist'
        })
    }else{
        await updateEmail(userId,email);
        res.status(204).json({
            message:'Successfully updated email!'
        });
    }
});

app.delete('/data/users/delete/:id',async (req, res)=>{
    const userId = await req.params.id;

    await deleteProfile(userId);
    res.status(200).send({message: 'User deleted successfully'})
});