import { html } from '../../node_modules/lit-html/lit-html.js'
import {getBookByUserId } from "../services/books.js";
import { getUserId } from './../api/util.js';

const myBook = (data) => html`
  <section id="dashboard-page" class="dashboard">
           
           <!-- Display ul: with list-items for All books (If any) -->
           ${data.length>0
           ?html`
           <ul class="other-books-list">
              ${data.map(previewTemplate)}
            </ul>
           `
           :html`
           <p class="no-books">No available books review!</p>
           `
            }
       </section>
`
const previewTemplate = (data) => html`
<li class="otherBooks">
                   <h3>${data.Title}</h3>
                   <p>Type: ${data.Kind}</p>
                   <img src="${data.Image}"></p>
                   <a class="button" href="/details/${data.Id}">Details</a>
               </li>
`
export async function MyBookPage(ctx){
    const id = await getUserId();
    let result = await getBookByUserId(id[0].Id);
    ctx.render(myBook(result));
}
