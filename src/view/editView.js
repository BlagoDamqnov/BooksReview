import { html } from '../../node_modules/lit-html/lit-html.js'
import { CreateSubmitHandler } from '../api/util.js';
import {  EditBook, getBookByBookId } from '../services/books.js';


const EditTemplate = (data,onSubmit) =>html`
   <section id="edit-page" class="edit" @submit=${onSubmit}>
            <form id="edit-form">
                <fieldset>
                    <legend>Edit my Book</legend>
                    <p class="field">
                        <label for="title">Title</label>
                        <span class="input">
                            <input type="text" name="title" id="title" value="${data[0].Title}">
                        </span>
                    </p>
                    <p class="field">
                        <label for="author">Author</label>
                        <span class="input">
                            <input type="text" name="author" id="author" value="${data[0].Author}">
                        </span>
                    </p>
                    <p class="field">
                        <label for="review">Review</label>
                        <span class="input">
                            <textarea name="review"
                                id="review">${data[0].Review}</textarea>
                        </span>
                    </p>
                    <p class="field">
                        <label for="image">Image</label>
                        <span class="input">
                            <input type="text" name="image" id="image" value="${data[0].Image}">
                        </span>
                    </p>
                    <p class="field">
                        <label for="type">Kind</label>
                        <span class="input">
                            <select id="kind" name="kind" value="${data[0].Kind}">
                            <option value="Fiction">Fiction/Фантастика</option>
                                <option value="Sci-fiction">Sci-Fiction/Научнофантастични</option>
                                <option value="Business">Business/Бизнес</option>
                                <option value="History">History/Историческа</option>
                                <option value="Romance">Romance/Романтика</option>
                                <option value="Mistery">Mistery/Мистерии</option>
                                <option value="Classic">Clasic/Класика</option>
                                <option value="Other">Other/Друга</option>
                            </select>
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Save">
                </fieldset>
            </form>
        </section>
`

async function onSubmit(ctx,data,event){
    let bookId = ctx.params.id
    if(Object.values(data).some(f=>f=='')){
        return alert('All fields are required!')
    }
    await EditBook(bookId,
      data.title,
      data.kind,
      data.author,
      data.review,
      data.image,
   );
   event.target.reset();
   ctx.page.redirect('/details/'+bookId)
}
export async function EditPage(ctx){
    const id = ctx.params.id;
    const result = await getBookByBookId(id);
   
    ctx.render(EditTemplate(result,CreateSubmitHandler(ctx,onSubmit)))
}