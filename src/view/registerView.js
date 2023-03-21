import { html } from '../../node_modules/lit-html/lit-html.js'
import { CreateSubmitHandler, getAccessToken } from "../api/util.js";
import { register } from "../services/user.js";
import { notify } from './../api/notify.js';
import { successfullyAlert } from './../api/alert.js';


const registerTemplate = (onSubmit) => html`
    <form  @submit=${onSubmit} class="register-form">
        <div class="form-group">
          <input type="email" class="form-control" id="email" name="email" placeholder="Enter email">
        </div>

        <div class="form-group">
          <input type="text" class="form-control" id="username" name="username" placeholder="Enter username">
        </div>

        <div class="form-group">
          <input type="password" class="form-control" id="password" name="password" placeholder="Enter password">
        </div>

        <div class="form-group">
          <input type="password" class="form-control" id="password-confirm" name="confirm-pass" placeholder="Enter re-password">
        </div>

        <div class="form-group">
          <input type="text" class="form-control" id="img" name="img" placeholder="Image URL">
        </div>

      <button type="submit" class="btn btn-primary">Register</button>
    </form>
`
async function onSubmit(ctx,data,event){
    if(data.email == '' || data.password == '' || data['confirm-pass'] == '' ||data.username==''){
        return notify('All fields are required!');
    }
    if(data.password!==data['confirm-pass']){
        return notify('Password do not match!')
    }
    
    const token = getAccessToken();

    if(data.img == ''){
      await register(token,data.email,data.password,data.username,'../../images/user.png');
    }else{
      await register(token,data.email,data.password,data.username,data.img);
    }

    successfullyAlert('Successfully registered!')
    event.target.reset();
    ctx.page.redirect('/');
}

export function registerPage(ctx){
    ctx.render(registerTemplate(CreateSubmitHandler(ctx,onSubmit)))
}