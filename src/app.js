import page from '../node_modules/page/page.mjs'
import { addRender } from './middleware/render.js';
import { addSession } from './middleware/session.js';
import { logout } from './services/user.js';
import { CreatePage } from './view/CreateBookView.js';
import { detailsPage } from './view/detailsView.js';
import { EditPage } from './view/editView.js';
import { homePage } from './view/homeView.js';
import { loginPage } from './view/loginView.js';
import { MyBookPage } from './view/MyBooksView.js';
import { registerPage } from './view/registerView.js';
import { searchPage } from './view/serachView.js';
import { successfullyAlert } from './api/alert.js';
import { settingsPage } from './view/settingsView.js';
import { favoritePage } from './view/favouriteBooks.js';
import { deleteFavoriteBook } from './services/books.js';
import { getUserId } from './api/util.js';


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
page('/favorite',favoritePage)
page('/remove/:id',removeFav)

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

async function removeFav(ctx){
    const bookId = Number(ctx.path.split('/')[2]);
    const userId = await getUserId();
    console.log(bookId);
    console.log(userId[0].Id);
    deleteFavoriteBook(userId[0].Id,bookId);
    setTimeout(()=>{
        ctx.page.redirect('/favorite');
    },800);
    successfullyAlert('Successfully remove from favorite!');
}