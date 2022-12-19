const list = document.getElementById('categoryList');
var query = location.search;
var value = query.split('=');
const userId = value[1];

async function showCategoryList(params) {
    
    result = await window.category.getAllCategories(userId);
    console.log(result.getAllCategories);
    let html;
    result.getAllCategories.forEach(category => {
        html += `<a href="#" class="list-group-item list-group-item-action categoryListItem">${category.name}</a>`
    });
    list.innerHTML = html;
    let listBTN = document.getElementsByClassName('categoryListItem')
    for (let index = 0; index < listBTN.length; index++) {
        listBTN[index].addEventListener('click', (e) => {
            // console.log( window.location.href);
            window.location.href = './product.html?name=' +  encodeURIComponent(listBTN[index].textContent);
            // console.log(listBTN[index].textContent);
        });
    }
}


showCategoryList();