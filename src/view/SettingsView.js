import { html} from '../../node_modules/lit-html/lit-html.js'
import { clearUserData, CreateSubmitHandler, getUserData } from './../api/util.js';
import { notify } from './../api/notify.js';
import { updateUsername } from '../services/user.js';
import { successfullyAlert } from './../api/alert.js';


const settingsTemplate = (user,onUpdate) =>html`
     <form  class="update" @submit=${onUpdate}>
       <label class="updateProfile">Username</label>
        <span class="input">
            <input type="text" name="username" id="username" placeholder="Username" value="${user.username}">
        </span>
        <button class="button">Update</button>
    </form>

    <form class="update">
       <label class="updateProfile">Email</label>
        <span class="input">
            <input type="text" name="email" id="email" placeholder="Email">
        </span>
        <button class="button">Update</button>
    </form>
`;

async function onUpdateProfile(ctx,data,event){
    let user = getUserData();
    console.log(user);
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
export async function settingsPage(ctx){
    let user = getUserData();
    ctx.render(settingsTemplate(user,CreateSubmitHandler(ctx,onUpdateProfile)))
}

