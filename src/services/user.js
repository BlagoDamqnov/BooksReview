import * as api from '../api/api.js'
import { clearUserData, setUserData } from '../api/util.js';

const endpoints = {
    loginUrl:'/users/login',
    registerUrl:'/users/register',
    logoutUrl:'/users/logout',
    getInfo:'/data/users/',
    updateUsername:'/data/update/username/',
    deleteProfile:'/data/users/delete/',
    updateEmail:'/data/update/email/',
    getUserId:'/data/books/user/',
    updateImage:'/data/update/image/'
}

export async function getUserByUsername(username){
    return await api.get(endpoints.getUserId+username);
}

export async function login(email,password){
    const result = await api.post(endpoints.loginUrl,{email,password});
    setUserData(result);
}

export async function register(accessToken,email,password,username,img){
    const result = await api.post(endpoints.registerUrl,{accessToken,email,password,username,img});
    setUserData(result);
}

export function logout(){
     api.get(endpoints.logoutUrl);
    clearUserData();
}

export async function userInfo(id){
    return await api.get(endpoints.getInfo+id);
}

export async function updateUsername(id,username){
    await api.put(endpoints.updateUsername+id,{username});
}

export async function deleteProfile(id){
    await api.del(endpoints.deleteProfile+id);
}

export async function updateEmail(id,email){
    await api.put(endpoints.updateEmail+id,{email});
}
export async function updateImage(image,id){
    await api.post(endpoints.updateImage+id,{image});
}

