import { html } from '../../node_modules/lit-html/lit-html.js'
import { getAllBookReviews } from "../services/books.js";


const homeTemplate = (data) => html`
          <section id="dashboard-page" class="dashboard">
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
export const previewTemplate = (data) => html`
               <li class="otherBooks">
                   <h3>${data.Title}</h3>
                   <p>Type: ${data.Kind}</p>
                     <img class="img" src="${data.Image}">
                   <a class="button" href="/details/${data.Id}">Details</a>
               </li>
`

export async function homePage(ctx){
    let result = await getAllBookReviews();
    ctx.render(homeTemplate(result));
}
