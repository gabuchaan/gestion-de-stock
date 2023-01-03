import { setClickEventCreateProduct, setClickEventOfMenu } from './common.js';
const list = document.getElementById('productList');
let params = new URLSearchParams(location.search);
const userId = params.get('user');
const categoryName = params.get('category-name');

const createProductBTN = document.getElementById('createProductBTN');
const deleteCategoryBTN = document.getElementById('deleteCategoryBTN');


async function showProductsList(categoryName) {
    let result = await window.product.getAllProducts(categoryName);
    console.log(result);
    let html;
    result.getAllProducts.forEach(product => {
        html += `<a href="../html/productDetail.html?user=${userId}&category-name=${categoryName}&product-id=${product.id}" class="list-group-item list-group-item-action">${product.name}</a>`
    });
    list.innerHTML = html;
}

deleteCategoryBTN.addEventListener('click', ()=> {
    window.open(`../html/deleteCategory.html?user=${userId}&category-name=${categoryName}`, "Confirm", "width=400,height=300");
})

console.log(userId);
console.log(window.location.search);
showProductsList(categoryName);
setClickEventCreateProduct(userId);
setClickEventOfMenu(userId);