import { html } from '../../node_modules/lit-html/lit-html.js'
import { CreateSubmitHandler, getAccessToken } from "../api/util.js";
import { register } from "../services/user.js";


const registerTemplate = (onSubmit) => html`
  <section id="register-page" class="register">
            <form id="register-form" action="" method="" @submit = ${onSubmit}>
                <fieldset>
                    <legend>Register Form</legend>
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
                    <p class="field">
                        <label for="repeat-pass">Repeat Password</label>
                        <span class="input">
                            <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Register">
                </fieldset>
            </form>
        </section>

`
async function onSubmit(ctx,data,event){
    if(data.email == '' || data.password == '' || data['confirm-pass'] == ''){
        return alert('All fields are required!');
    }
    if(data.password!==data['confirm-pass']){
        return alert('Password do not match!')
    }
    const token = getAccessToken();
    await register(token,data.email,data.password);
    event.target.reset();
    ctx.page.redirect('/');
}
export function registerPage(ctx){
    ctx.render(registerTemplate(CreateSubmitHandler(ctx,onSubmit)))
}