const list = document.getElementById('categoryList');
const createCategoryBTN = document.getElementById('createCategoryBTN');
let params = new URLSearchParams(location.search);
const userId = params.get('user');
import { setClickEventOfMenu, setClickEventCreateCategory } from "./common.js";


async function showCategoryList() {
    
    let result = await window.category.getAllCategories(userId);
    console.log(result);
    let html = "";
    result.getAllCategories.forEach(category => {
        html += `<a href="#" class="list-group-item list-group-item-action categoryListItem">${category.name}</a>`
    });
    list.innerHTML = html;
    let listBTN = document.getElementsByClassName('categoryListItem')
    for (let index = 0; index < listBTN.length; index++) {
        listBTN[index].addEventListener('click', (e) => {
            // console.log( window.location.href);
            window.location.href = './product.html?category-name=' +  encodeURIComponent(listBTN[index].textContent)  + "&user=" + userId;
            // console.log(listBTN[index].textContent);
        });
    }
}
setClickEventOfMenu(userId);
setClickEventCreateCategory(userId);
showCategoryList();