import { html } from '../../node_modules/lit-html/lit-html.js'
import { CreateSubmitHandler, getUserId } from '../api/util.js';
import { Create } from '../services/books.js';


const CreateTemple = (onSubmit) =>html`
<section id="create-page" class="create">
            <form id="create-form" @submit = ${onSubmit}>
                <fieldset>
                    <legend>Add new Book</legend>
                    <p class="field">
                        <label for="title">Title</label>
                        <span class="input">
                            <input type="text" name="title" id="title" placeholder="Title">
                        </span>
                    </p>
                    <p class="field">
                        <label for="author">Author</label>
                        <span class="input">
                            <textarea name="author" id="author" placeholder="author"></textarea>
                        </span>
                    </p>
                    <p class="field">
                        <label for="review">Review</label>
                        <span class="input">
                            <textarea name="review" id="review" placeholder="Review"></textarea>
                        </span>
                    </p>
                   <p class="field">
                        <label for="img">Image</label>
                        <span class="input">
                            <textarea name="img" id="img" placeholder="Image"></textarea>
                        </span>
                    </p>
                    <p class="field">
                        <label for="kind">Kind</label>
                        <span class="input">
                            <select id="kind" name="kind">
                                <option value="Fiction">Fiction</option>
                                <option value="Romance">Romance</option>
                                <option value="Mistery">Mistery</option>
                                <option value="Classic">Clasic</option>
                                <option value="Other">Other</option>
                            </select>
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Add Book">
                </fieldset>
            </form>
        </section>
`
async function onSubmit(ctx,data,event){
    if(data.title == '' || data.review == '' || data.author == '' || data.kind == ''||data.img=='') {
        return alert('All fields are required!')
    }
    const userId = await getUserId();
    event.target.reset();
    ctx.page.redirect('/')
    await Create(data.title,data.author,data.review,data.kind,data.img,userId[0].Id);
}
export function CreatePage(ctx){
    ctx.render(CreateTemple(CreateSubmitHandler(ctx,onSubmit)));
}