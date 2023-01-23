import { html} from '../../node_modules/lit-html/lit-html.js'


const settingsTemplate = () =>html`
     <form >
       <label class="updateProfile">Username</label>
        <span class="input">
            <input type="text" name="username" id="username" placeholder="Username">
        </span>
        <button class="button">Update</button>
    </form>

    <form >
       <label class="updateProfile">Email</label>
        <span class="input">
            <input type="text" name="email" id="email" placeholder="Email">
        </span>
        <button class="button">Update</button>
    </form>
`;

export async function settingsPage(ctx){
ctx.render(settingsTemplate())
}
