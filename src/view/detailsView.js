import { html, nothing } from '../../node_modules/lit-html/lit-html.js'
import { getUserId } from '../api/util.js';
import { createLike, deleteBook, getBookByBookId } from '../services/books.js';
import { isLiked } from './../services/books.js';
import { successfullyAlert } from './../api/alert.js';
import { userInfo } from '../services/user.js';


const detailsTemplate = (data,onDelete,user) => html`
                <section id="details-page" class="details">
                        <div class="book-information">
                                <h3>${data[0].Title}</h3>
                                <h3>${data[0].Author}</h3>
                                <p class="type">Type: ${data[0].Kind}</p>
                                <p class="img"><img src="${data[0].Image}"></p>
                                <a href="/userBook"><img class = "userImage" src="${user[0].Image}"><p>Creator:${user[0].Username}</p><img/></a>
                                ${data.IsOwner?
                                html`
                                <div class="actions">
                                    <a class="button" href="/edit/${data[0].Id}">Edit</a>
                                    <a class="button" href="javascript:void(0)" @click =${onDelete}>Delete</a>
                                    <label>LIKE:${data[0].Like}</label>
                                </div>
                                `:
                                localStorage.length>0
                                ?html`<button class="button" id = "likeBtn" disable>LIKE</button>
                                        <label>LIKE:${data[0].Like}</label>
                                        `
                                    :nothing}
                        </div>
                        <div class="book-description">
                                <h3>Description:</h3>
                                <p>${data[0].Review}</p>
                                <span>Created on: <label id="data">${(data[0].DataCreated).split('T')[0]}</label></span>
                        </div>
                </section>

`

const detailsTemplateSecond = (data,onDelete,user) => html`
                    <section id="details-page" class="details">
                            <div class="book-information">
                                    <h3>${data[0].Title}</h3>
                                    <h3>${data[0].Author}</h3>
                                    <p class="type">Type: ${data[0].Kind}</p>
                                    <p class="img"><img src="${data[0].Image}"></p>
                                    <a href="/userBook"><img class = "userImage" src="${user[0].Image}"><p>Creator:${user[0].Username}</p><img/></a>
                                    ${data.IsOwner?
                                    html`
                                    <div class="actions">
                                        <a class="button" href="/edit/${data[0].Id}">Edit</a>
                                        <a class="button" href="javascript:void(0)" @click =${onDelete}>Delete</a>
                                        <label>LIKE:${data[0].Like}</label>
                                    </div>
                                    `:
                                    localStorage.length>0
                                    ?html`
                                            <label>LIKE:${data[0].Like}</label>
                                `:nothing}
                            </div>
                            <div class="book-description">
                                    <h3>Description:</h3>
                                    <p>${data[0].Review}</p>
                                    <span>Created on: <label id="data">${(data[0].DataCreated).split('T')[0]}</label></span>
                            </div>
                    </section>

`

export async function detailsPage(ctx){
    let bookId = ctx.params.id;
    let userId = await getUserId();

    const result = await getBookByBookId(bookId);
    let user = await userInfo(result[0].UserId);

    if(ctx.user){
        result.IsOwner = userId[0].Id ===result[0].UserId
        }
        function onDelete(){
            const choice = confirm('Are you sure!');

            if(choice){
            deleteBook(bookId);

            successfullyAlert('Successfully deleted!')
            ctx.page.redirect('/');
            }
        }
        if(localStorage.length==0){
            ctx.page.redirect('/login')
        }
        let isLike = await isLiked(bookId,userId[0].Id);

        if(isLike.length>0||result.IsOwner){
            ctx.render(detailsTemplateSecond(result,onDelete,user));
        }else{
            ctx.render(detailsTemplate(result,onDelete,user));

            document.getElementById('likeBtn').addEventListener('click', function(e){
                const element = e.target;

                createLike(bookId,userId[0].Id);
                
                element.style.visibility = 'hidden';
                ctx.page.redirect('/details/'+bookId)
            })
        }
}
