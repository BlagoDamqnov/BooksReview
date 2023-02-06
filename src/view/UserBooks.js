import { html } from '../../node_modules/lit-html/lit-html.js'
import {getBookByUserId } from "../services/books.js";
import { getUserId } from './../api/util.js';

const myBook = () => html`
   <h1>dsa</h1>
`

export async function UserBooks(ctx){
    console.log(ctx);
    ctx.render(myBook());
}
