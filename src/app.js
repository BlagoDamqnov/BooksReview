import page from '../node_modules/page/page.mjs'
import { addRender } from './middleware/render.js';
import { addSession } from './middleware/session.js';
import { logout } from './services/user.js';
import { CreatePage } from './view/createBookView.js';
import { detailsPage } from './view/detailsView.js';
import { EditPage } from './view/editView.js';
import { homePage } from './view/homeView.js';
import { loginPage } from './view/loginView.js';
import { MyBookPage } from './view/myBooksView.js';
import { registerPage } from './view/registerView.js';
import { searchPage } from './view/serachView.js';
import { successfullyAlert } from './api/alert.js';
import { settingsPage } from './view/SettingsView.js';
import { UserBooks } from './view/userBooks.js';


page(addSession);
page(addRender);

page('/',homePage);
page('/create',CreatePage);
page('/login',loginPage);
page('/register',registerPage);
page('/logout',logoutFunc);
page('/edit/:id',EditPage)
page('/search',searchPage)
page('/details/:id',detailsPage)
page('/myBook',MyBookPage);
page('/settings',settingsPage)
page('/userBook',UserBooks)

page(addSession);
page(addRender);

page.start();

function logoutFunc(ctx){
    const choice = confirm('Are you sure to Logout?');
        if(choice){
            logout();
            successfullyAlert('Successfully logged out!')
            ctx.page.redirect('/login')
        }
    }