import {html,render} from '../../../node_modules/lit-html/lit-html.js'

const root = document.getElementById('site-content');
const headerElement = document.getElementById('site-header');

const navigationTemplate = (user) =>html`
            <!-- Navigation -->
            <nav class="navbar">
                <section class="navbar-dashboard">
                    <a href="/">Reviews</a>
                    ${user
                        ?html`
                     <div id="user">
                        <nav>
                        <a href="/settings"><img class= "userImage" src="${user.img}"></a>
                        <span id="welcome">${user.username}</span>
                        <ul>
                            <li><a href="/myBook">MyBooks</a></li>
                            <li><a href="/search">Search</a></li>
                            <li><a href="/create">AddBook</a></li>
                            <li><a href="/logout">Logout</a></li>
                        </ul>
                        </nav>
                        </div>`
                        :html`
                     <div id="guest">
                     <nav>
                        <ul>
                            <li><a href="/login">Login</a></li>
                            <li><a href="/register">Register</a></li>
                        </ul>
                    </nav>
                     </div>
                     `}
                </section>
            </nav>
`

function ctxRender(content){
    render(content,root)
}

export function addRender(ctx,next){
    render(navigationTemplate(ctx.user),headerElement);
    ctx.render =ctxRender;

    next();
}