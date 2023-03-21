import { html, nothing } from '../../node_modules/lit-html/lit-html.js'
import { getUserId } from '../api/util.js';
import { createLike, deleteBook, getBookByBookId, getBookByUserId } from '../services/books.js';
import { isLiked } from './../services/books.js';
import { successfullyAlert } from './../api/alert.js';
import { getUserByUsername, userInfo } from '../services/user.js';


const detailsTemplate = (data,onDelete,user) => html`
                <section id="details-page" class="details">
                        <div class="book-information">
                                <h3>${data[0].Title}</h3>
                                <h3>${data[0].Author}</h3>
                                <p class="type">Type: ${data[0].Kind}</p>
                                <p class="img"><img src="${data[0].Image}"></p>
                                <p id="creatorName"><a id="userInfo">Creator:${user[0].Username}</a></p>
                                <a class="creatorImg"><img class = "userImage" src="${user[0].Image}"><img/></a>
                                ${data.IsOwner?
                                html`
                                <div class="actions">
                                    <a class="button" href="/edit/${data[0].Id}">Edit</a>
                                    <a class="button" href="javascript:void(0)" @click =${onDelete}>Delete</a>
                                    <label class = 'likeBtnLabel'>Stars:${data[0].Like}</label>
                                </div>
                                `:
                                localStorage.length>0
                                ?html`
                                    <div id ="btnWrapper">
                                    <button class="button" id = "likeBtn">Add to Favorite</button>
                                    </div>
                                        <label class = 'likeBtnLabel'>Favorite:${data[0].Like}</label>
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
                                    <p id="creatorName"><a  id="userInfo">Creator:${user[0].Username}</a></p>
                                    <a class="creatorImg"><img class = "userImage" src="${user[0].Image}"><img/></a>
                                    ${data.IsOwner?
                                    html`
                                    <label class = 'likeBtnLabel'>Stars:${data[0].Like}</label>
                                    <div class="actions">
                                        <a class="button" href="/edit/${data[0].Id}">Edit</a>
                                        <a class="button" href="javascript:void(0)" @click =${onDelete}>Delete</a>
                                    </div>
                                    `:
                                    localStorage.length>0
                                    ?html`
                                            <label class = 'likeBtnLabel'>Stars:${data[0].Like}</label>
                                `:nothing}
                            </div>
                            <div class="book-description">
                                    <h3>Description:</h3>
                                    <p>${data[0].Review}</p>
                                    <span>Created on: <label id="data">${(data[0].DataCreated).split('T')[0]}</label></span>
                            </div>
                    </section>

`
const userBooks = (data,name) => html`
    <h1 id="userBooksName">The ${name}'s books</h1>
        <section id="dashboard-page" class="dashboard">
            ${data.length>0
            ?html`
            <ul class="other-books-list">
                ${data.map(previewTemplate)}
              </ul>
            `
            :html`
            <p class="no-books">No available my books review!</p>
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
            let getElements = document.getElementsByClassName('likeBtnLabel')[0];
                
                getElements.className = 'labelLike'
                console.log(getElements);
        }else{
            ctx.render(detailsTemplate(result,onDelete,user));

            document.getElementById('likeBtn').addEventListener('click', function(e){
                const element = e.target;

                let getElements = document.getElementsByClassName('likeBtnLabel')[0];
                
                getElements.className = 'labelLike'
                
                createLike(bookId,userId[0].Id);

                element.style.visibility = 'hidden';
                ctx.page.redirect('/details/'+bookId)
            })
        }

        const element = document.getElementById('userInfo');
        const userInformation = document.getElementsByClassName('creatorImg')[0];

        userInformation.addEventListener('click', async (e)=>{
           let name = element.textContent.split(':')[1];
           let getUser = await getUserByUsername(name);

           var userId = getUser.recordset[0].Id; 
           let books = await getBookByUserId(userId);

            ctx.render(userBooks(books,name));
        });

       document.getElementsByClassName('creatorImg')[0].addEventListener('mouseenter',()=>{
                document.getElementById('creatorName').style.display = 'block';
            });

       document.getElementsByClassName('creatorImg')[0].addEventListener('mouseleave',()=>{
                    document.getElementById('creatorName').style.display = 'none';
      });
}
