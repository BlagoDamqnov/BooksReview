import { html, nothing } from '../../node_modules/lit-html/lit-html.js'
import { getUserId } from '../api/util.js';
import { deleteBook, getBookByBookId } from '../services/books.js';


const detailsTemplate = (data,onDelete) => html`
 <section id="details-page" class="details">
            <div class="book-information">
                <h3>${data[0].Title}</h3>
                <h3>${data[0].Author}</h3>
                <p class="type">Type: ${data[0].Kind}</p>
                <p class="img"><img src="${data[0].Image}"></p>
                ${data.IsOwner?
                html`
                <div class="actions">
                    <a class="button" href="/edit/${data[0].Id}">Edit</a>
                    <a class="button" href="/" @click =${onDelete}>Delete</a>
                </div>
                `:nothing}
            </div>
            <div class="book-description">
                <h3>Description:</h3>
                <p>${data[0].Review}</p>
            </div>
        </section>

`

export async function detailsPage(ctx){
  let bookId = ctx.params.id
  let userId = await getUserId();
  const result = await getBookByBookId(bookId);
  if(ctx.user){
    result.IsOwner = userId[0].Id ===result[0].UserId
    }
    
    ctx.render(detailsTemplate(result,onDelete));
    async function onDelete(){
        const choice = confirm('Are you sure!');

        if(choice){
          await deleteBook(bookId);
          ctx.page.redirect('/');
        }
    }
}
