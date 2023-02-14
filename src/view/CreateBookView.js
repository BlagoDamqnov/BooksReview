import { html } from '../../node_modules/lit-html/lit-html.js'
import { CreateSubmitHandler, getUserId } from '../api/util.js';
import { Create } from '../services/books.js';
import { notify } from './../api/notify.js';
import { successfullyAlert } from './../api/alert.js';


const CreateTemple = (onSubmit) =>html`
              <form  @submit=${onSubmit} class="register-form">
              <h3>Create Review</h3>
                <div class="form-group">
                  <input type="text" class="form-control" id="title" name="title" placeholder="Enter Title">
                </div>
                <div class="form-group">
                  <input type="text" class="form-control" id="author" name="author" placeholder="Enter Author">
                </div>
                <div class="form-group">
                <textarea id="review" class="form-control" name="review" placeholder="Description" rows="5" cols="50"></textarea>
                </div>
                <div class="form-group">
                  <input type="text" class="form-control" id="img" name="img" placeholder="Enter image URL">
                </div>
                <div class="form-group">
                <span class="input">
                                          <select id="kind" name="kind">
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
    if(data.title == '' || data.review == '' || data.author == '' || data.kind == ''||data.img=='') {
        return notify('All fields are required!')
    }

    const userId = await getUserId();
    event.target.reset();

    ctx.page.redirect('/');
    await Create(data.title,data.author,data.review,data.kind,data.img,userId[0].Id);
    successfullyAlert('Created book successfully!')
}
export function CreatePage(ctx){
    ctx.render(CreateTemple(CreateSubmitHandler(ctx,onSubmit)));
}