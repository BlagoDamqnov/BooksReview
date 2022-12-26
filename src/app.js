import page from '../node_modules/page/page.mjs'
import { addRender } from './middleware/render.js';
import { addSession } from './middleware/session.js';
import { logout } from './services/user.js';
import { CreatePage } from './view/createBookView.js';
import { homePage } from './view/homeView.js';
import { loginPage } from './view/loginView.js';
import { MyBookPage } from './view/myBooksView.js';
import { registerPage } from './view/registerView.js';



page(addSession);
page(addRender);

page('/login',loginPage);
page('/',homePage);
page('/create',CreatePage);
page('/logout',logoutFunc);
page('/register',registerPage);
page('/myBook',MyBookPage);
page('/profile',()=>console.log('myBook'));

page.start();

function logoutFunc(ctx){
    logout();
    ctx.page.redirect('/login')
}