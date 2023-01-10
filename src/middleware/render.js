import {html,render} from '../../../node_modules/lit-html/lit-html.js'

const root = document.getElementById('site-content');
const headerElement = document.getElementById('site-header');

const navigationTemplate = (user) =>html`
            <!-- Navigation -->
            <nav class="navbar">
                <section class="navbar-dashboard">
                    <a href="/">Reviews</a>
                    <!-- Logged-in users -->
                    ${user
                     ?html`
                     <div id="user">
                         <span>Welcome, ${user.username}</span>
                         <a class="button" href="/myBook">My Books</a>
                         <a class="button" href="/search">Search</a>
                         <a class="button" href="/create">Add Book</a>
                         <a class="button" href="/logout">Logout</a>
                        </div>`
                     :html`
                     <!-- Guest users -->
                     <div id="guest">
                         <a class="button" href="/login">Login</a>
                         <a class="button" href="/register">Register</a>
                     </div>
                     `}
                </section>
            </nav>
`
function ctxRender(content){
    render(content,root)
}

export function addRender(ctx,next){
    render(navigationTemplate(ctx.user),headerElement)
    ctx.render =ctxRender;
    next();
}