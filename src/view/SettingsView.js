import { html} from '../../node_modules/lit-html/lit-html.js'
import { clearUserData, CreateSubmitHandler, getUserData } from './../api/util.js';
import { notify } from './../api/notify.js';
import { deleteProfile, updateEmail, updateImage, updateUsername } from '../services/user.js';
import { successfullyAlert } from './../api/alert.js';


const settingsTemplate = (user,onDelete,onUpdate,onUpdateEmail,onUpdateImage) =>html`
<div class="grid-container">
  <form class="update" @submit=${onUpdate}>
    <label class="updateProfile">Update Username</label>
    <span class="input">
      <input type="text" name="username" id="username" placeholder="Username" value="${user.username}">
    </span>
    <button class="button">Update</button>
  </form>

  <form class="update" @submit=${onUpdateEmail}>
    <label class="updateProfile">Update email</label>
    <span class="input">
      <input type="text" name="email" id="email" placeholder="Email" value="${user.email}">
    </span>
    <button class="button">Update</button>
  </form>

  <form class="update" @submit=${onUpdateImage}>
    <label class="updateProfile">Update Image</label>
    <span class="input">
      <input type="text" name="image" id="image" placeholder="ImageURl" value="${user.img}">
    </span>
    <button class="button">Update</button>
  </form>

  <form class="update" @submit = ${onDelete}>
    <button class="button" id="del">Delete Profile</button>
  </form>

  <!-- add content for the second row in the first column -->

  <!-- add content for the second row in the second column -->
</div>


`;

async function onUpdateProfile(ctx,data,event){
   

    try {
        let user = getUserData();
        
        if(data.username==''){
            return notify('Field is required');
        }
        else if(data.username == user.username){
            return notify('Username is same as new!');
        }else{
            await updateUsername(user.id[0].Id,data.username)
            clearUserData();
            setTimeout(()=>{
                ctx.page.redirect('/login');
            },1500)
            
            successfullyAlert('Successfully updated username')
        }
    } catch (error) {
        return notify(error.message)
    }
}
async function onUpdateEmail(ctx,data,event){

    try {
        let user = getUserData();
        let userId = user.id[0].Id;
        let email = user['email'];
    
        let newEmail = data.email;
    
        if(email!==newEmail){
            await updateEmail(userId, newEmail);
            clearUserData();
            setTimeout(()=>{
                ctx.page.redirect('/login');
            },1500);
            successfullyAlert('Successfully updated email!');
        }else{
            return notify('Email is same as existing')
        }
    } catch (error) {
        return notify(error.message)
    }
}
async function onDeleteProfile(ctx){
    const choice = confirm('Are you sure want to delete account?');
    if(choice){
        let user = getUserData();
        console.log(user);
        
        await deleteProfile(user.id[0].Id);
        clearUserData();
        setTimeout(()=>{
            ctx.page.redirect('/login');
        },1000);
        successfullyAlert('Profile deleted successfully');
    }
}
async function onUpdateImage(ctx,data){
    try {
        let user = getUserData();
        let userId = user.id[0].Id;
    
        let img = data.image;
        console.log(img);
        if(img!=null){
              updateImage(img,userId);
            clearUserData();
            setTimeout(()=>{
                ctx.page.redirect('/login');
            },1500);
            successfullyAlert('Successfully updated image!');
        }else{
            return notify('Image is empty')
        }
    } catch (error) {
       console.log(error);
    }
}
export async function settingsPage(ctx){
    let user = getUserData();

     ctx.render(settingsTemplate(user,CreateSubmitHandler(ctx,onDeleteProfile),CreateSubmitHandler(ctx,onUpdateProfile),CreateSubmitHandler(ctx,onUpdateEmail),CreateSubmitHandler(ctx,onUpdateImage)));
}

