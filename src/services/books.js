import * as api from '../api/api.js';

const endpoints = {
    getAllBooks:'/data/books',
    createReview:'/data/create',
    getBookByUserId:'/data/books/',
    getBookByBookId:'/data/details/',
    deleteBook:'/data/delete/',
    editBook:'/data/edit/',
    createLike:'/data/book/like/',
    searchBook:'/data/books/find/',
    isLiked:'/data/book/like',
    favoriteBooks:'/data/books/favorite/',
    removeFavoriteBook:'/data/book/remove/favorite/'
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

export function deleteBook(id){
    return  api.del(endpoints.deleteBook+id);
}

export async function EditBook(id,title,kind,author,review,img){
   return await api.put(endpoints.editBook+id,{title,kind,author,review,img});
}

export function createLike(id,userId){
    return  api.post(endpoints.createLike+id,{userId});
}

export function searchBook(input){
    return api.get(endpoints.searchBook+input)
}

export function isLiked(bookId,userId){
    return api.post(endpoints.isLiked,{bookId,userId});
}
export async function getFavoriteBooks(userId){
    return await api.get(endpoints.favoriteBooks+userId);
}
export async function deleteFavoriteBook(userId,bookId){
    return await api.del(endpoints.removeFavoriteBook+bookId+'/'+userId);
}