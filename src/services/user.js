import * as api from '../api/api.js'
import { clearUserData, setUserData } from '../api/util.js';

const endpoints = {
    loginUrl:'/users/login',
    registerUrl:'/users/register',
    logoutUrl:'/users/logout',
}

export async function login(email,password){
    const result = await api.post(endpoints.loginUrl,{email,password});
    setUserData(result);
}
export async function register(accessToken,email,password,username){
    const result = await api.post(endpoints.registerUrl,{accessToken,email,password,username});
    setUserData(result);
}
export function logout(){
     api.get(endpoints.logoutUrl);
    clearUserData();
}