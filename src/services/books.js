import * as api from '../api/api.js';

const endpoints = {
    getAllBooks:'/data/books',
    createReview:'/data/create',
    getBookByUserId:'/data/books/',
    getBookByBookId:'/data/details/'
}

export async function getAllBookReviews(){
    return await api.get(endpoints.getAllBooks);
}
export async function Create(title,author,review,kind,img,userId){
    return await api.post(endpoints.createReview,{title,author,review,kind,img,userId});
}
export async function getBookByUserId(id){
    return await api.get(endpoints.getBookByUserId+id);
}
export async function getBookByBookId(id){
    return await api.get(endpoints.getBookByBookId+id);
}