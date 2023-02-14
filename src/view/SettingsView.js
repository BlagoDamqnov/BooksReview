import { html} from '../../node_modules/lit-html/lit-html.js'
import { clearUserData, CreateSubmitHandler, getUserData } from './../api/util.js';
import { notify } from './../api/notify.js';
import { deleteProfile, updateUsername } from '../services/user.js';
import { successfullyAlert } from './../api/alert.js';


const settingsTemplate = (user,onUpdate) =>html`
     <form  class="update" @submit=${onUpdate}>
        <label class="updateProfile">Update Username</label>
            <span class="input">
                <input type="text" name="username" id="username" placeholder="Username" value="${user.username}">
            </span>
            <button class="button">Update</button>
    </form>

    <form class="update">
        <label class="updateProfile">Update email or Delete profile</label>
            <span class="input">
                <input type="text" name="email" id="email" placeholder="Email">
            </span>
            <button class="button">Update</button>
            <form>
                <button class="button" id='del'>Delete Profile</button>        
            </form>
    </form>

`;

async function onUpdateProfile(ctx,data,event){
    let user = getUserData();
 
    if(data.username==''){
        return notify('Field is required');
    }


    if(data.username == user.username){
        return notify('Username is same as new!');
    }

    event.target.reset();
    clearUserData();

    ctx.page.redirect('/login');
    successfullyAlert('Username updated successfully!Please login again!');

    await updateUsername(user.id[0].Id,data.username);
}

async function onDeleteProfile(ctx){
    const choice = confirm('Are you sure want to delete account?');
    if(choice){
        let user = getUserData();
        clearUserData();

        await deleteProfile(user.id[0].Id);
        successfullyAlert('Profile deleted successfully');
    }
}

export async function settingsPage(ctx){
    let user = getUserData();

    ctx.render(settingsTemplate(user,CreateSubmitHandler(ctx,onUpdateProfile)));

    document.getElementById('del').addEventListener('click',onDeleteProfile);
}

