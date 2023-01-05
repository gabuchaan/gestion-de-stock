import { setClickEventCreateProduct, setClickEventOfMenu } from './common.js';
const list = document.getElementById('productList');
let params = new URLSearchParams(location.search);
const userId = params.get('user');
const categoryName = params.get('category-name');

const createProductBTN = document.getElementById('createProductBTN');
const deleteCategoryBTN = document.getElementById('deleteCategoryBTN');


async function showProductsList(categoryName) {
    const obj = {
        userId: userId,
        categoryName: categoryName
    }
    let result = await window.product.getAllProductsOfCategory(obj);
    let html;
    result.getAllProductsOfCategory.forEach(product => {
        if (product.stock < product.stock_min) {
            html += `<a href="../html/productDetail.html?user=${userId}&category-name=${categoryName}&product-id=${product.id}" class="list-group-item list-group-item-action"><div class="row justify-content-between"><div class="col-4">${product.name}</div><div class="col-4 text-danger">${product.stock}</div></div></a>`;
        }else{
            html += `<a href="../html/productDetail.html?user=${userId}&category-name=${categoryName}&product-id=${product.id}" class="list-group-item list-group-item-action"><div class="row justify-content-between"><div class="col-4">${product.name}</div><div class="col-4">${product.stock}</div></div></a>`;
        }
    });
    list.innerHTML = html;
}

deleteCategoryBTN.addEventListener('click', ()=> {
    window.open(`../html/deleteCategory.html?user=${userId}&category-name=${categoryName}`, "Confirm", "width=400,height=300");
})

showProductsList(categoryName);
setClickEventCreateProduct(userId);
setClickEventOfMenu(userId);