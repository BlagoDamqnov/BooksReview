import { html } from '../../node_modules/lit-html/lit-html.js'
import {getBookByUserId, getFavoriteBooks } from "../services/books.js";
import { getUserId } from './../api/util.js';


const myBook = (data) => html`
        <section id="dashboard-page" class="dashboard">
            ${data.length>0
            ?html`
            <ul class="other-books-list">
                ${data.map(previewTemplate)}
              </ul>
            `
            :html`
            <p class="no-books">No available favorite books!</p>
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
            <a class="button" href="/remove/${data.Id}">Remove</a>
        </li>
`
export async function favoritePage(ctx){
    const id = await getUserId();
    let result = await getFavoriteBooks(id[0].Id);

    ctx.render(myBook(result));
}
