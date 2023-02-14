import { html, nothing } from '../../node_modules/lit-html/lit-html.js'
import { searchBook } from '../services/books.js';
import {previewTemplate} from './homeView.js'


const searchTemplate = (onChange,onSearch,books = []) =>html`
          <section id="searchPage" class="dashboard">
              <div class="search-container">
                  <form>
                    <h3>Search Books</h3>
                    <input type="text" placeholder="Search..." @input=${onChange}>
                    <button class= "button"type="submit" @click=${onSearch}>Search</button>
                  </form>
              </div>
            ${books.length>0
                  ?html`
                      <ul class="other-books-list">
                        ${books.map(previewTemplate)}
                      </ul>
                  `
                  :html`
                  <p class="no-books">No available books review!</p>
                  `}
            </div>
          </section>
`;

export async function searchPage(ctx){
   let currentSearch = '';

   const onSearchChange = (e) =>{
    currentSearch = e.target.value;
   }

   const onSearchClick = async (e) =>{
    e.preventDefault();
   await searchBook(currentSearch)
    .then(b=>{
        ctx.render(searchTemplate(onSearchChange,onSearchClick,b));
    })
}

ctx.render(searchTemplate(onSearchChange,onSearchClick))
}
