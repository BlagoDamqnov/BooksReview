import { html } from '../../node_modules/lit-html/lit-html.js'
import { CreateSubmitHandler } from "../api/util.js";
import { login } from "../services/user.js";
import { getUserId } from './../api/util.js';

const loginTemplate = (onSubmit) => html`
    <section id="login-page" class="login">
            <form id="login-form" @submit=${onSubmit}>
                <fieldset>
                    <legend>Login Form</legend>
                    <p class="field">
                        <label for="email">Email</label>
                        <span class="input">
                            <input type="text" name="email" id="email" placeholder="Email">
                        </span>
                    </p>
                    <p class="field">
                        <label for="password">Password</label>
                        <span class="input">
                            <input type="password" name="password" id="password" placeholder="Password">
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Login">
                </fieldset>
            </form>
        </section>
`
async function onSubmit(ctx,data,event){
    if(data.email == '' ||data.password==''){
        alert('All fields are required!')
    }
    await login(data.email,data.password);
    event.target.reset();
    ctx.page.redirect('/')
}
export function loginPage(ctx){
    ctx.render(loginTemplate(CreateSubmitHandler(ctx,onSubmit)))
}