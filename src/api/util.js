export function getUserData(){
    return JSON.parse(localStorage.getItem('user'));
}

export function getAccessToken(){
    const user = getUserData();
    
    if(user){
        return user.token;
    }else{
        return null;
    }
}
export function getUserId(){
    const user = getUserData();
    
    if(user){
        return user.id;
    }else{
        return null;
    }
}

export function clearUserData(){
    localStorage.removeItem('user');
}

export function setUserData(data){
    localStorage.setItem('user',JSON.stringify(data));
}

export function CreateSubmitHandler(ctx,handler){
    return function(event){
        event.preventDefault();
        const formData = Object.fromEntries(new FormData(event.target));

        handler(ctx,formData,event);
    }
}
