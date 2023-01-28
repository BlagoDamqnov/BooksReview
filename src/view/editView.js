import { html } from '../../node_modules/lit-html/lit-html.js'
import { CreateSubmitHandler } from '../api/util.js';
import {  EditBook, getBookByBookId } from '../services/books.js';
import { notify } from './../api/notify.js';
import { successfullyAlert } from './../api/alert.js';


const EditTemplate = (data,onSubmit) =>html`
   <form  @submit=${onSubmit} class="register-form">
<h3>Edit Review</h3>
  <div class="form-group">
    <input type="text" class="form-control" id="title" name="title" placeholder="Enter Title" value=${data[0].Title}>
  </div>
  <div class="form-group">
    <input type="text" class="form-control" id="author" name="author" placeholder="Enter Author" value=${data[0].Author}>
  </div>
  <div class="form-group">
    <input type="text" class="form-control" id="review" name="review" placeholder="Enter Review" value=${data[0].Review}>
  </div>
  <div class="form-group">
    <input type="text" class="form-control" id="img" name="img" placeholder="Enter image URL" value=${data[0].Image}>
  </div>
  <div class="form-group">
  <span class="input">
                            <select id="kind" name="kind" value=${data[0].Kind}>
                                <option value="Fiction">Fiction/Фантастика</option>
                                <option value="Sci-fiction">Sci-Fiction/Научнофантастични</option>
                                <option value="Business">Business/Бизнес</option>
                                <option value="History">History/Историческа</option>
                                <option value="Romance">Romance/Романтика</option>
                                <option value="Mistery">Mistery/Мистерии</option>
                                <option value="Classic">Clasic/Класика</option>
                                <option value="Erothic">Erothic/Еротична</option>
                                <option value="Other">Other/Друга</option>
                            </select>
  </div>
  <button type="submit" class="btn btn-primary">Create Review</button>
</form>
`

async function onSubmit(ctx,data,event){
    let bookId = ctx.params.id
    if(Object.values(data).some(f=>f=='')){
        return notify('All fields are required!')
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
   successfullyAlert('Edited book successfully!')
}
export async function EditPage(ctx){
    const id = ctx.params.id;
    const result = await getBookByBookId(id);
   
    ctx.render(EditTemplate(result,CreateSubmitHandler(ctx,onSubmit)))
}