import { html } from '../../node_modules/lit-html/lit-html.js'
import { CreateSubmitHandler } from "../api/util.js";
import { login } from "../services/user.js";
import { notify } from './../api/notify.js';
import { successfullyAlert } from './../api/alert.js';

const loginTemplate = (onSubmit) => html`
     <form @submit = ${onSubmit}>
        <input type="text" id="email" name="email" placeholder="Enter email">
        <br>
        <input type="password" id="password" name="password" placeholder="Enter password">
        <br>
        <input type="submit" value="Login">
  </form>
`
async function onSubmit(ctx,data,event){
    if(data.email == '' ||data.password==''){
        return notify('All fields are required!')
    }
    await login(data.email,data.password);
    successfullyAlert('Successfully login !')
    event.target.reset();
    ctx.page.redirect('/')
}
export function loginPage(ctx){
    ctx.render(loginTemplate(CreateSubmitHandler(ctx,onSubmit)))
}