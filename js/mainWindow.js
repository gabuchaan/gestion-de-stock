import { setClickEventOfMenu } from "./common.js";
const categoryBTN = document.getElementById('categoryBTN');
let params = new URLSearchParams(location.search);
const userId = params.get('user');
const categoryName = params.get('category-name');
const productCategory = document.getElementById('ddMenu');
const list = document.getElementById('productList');

async function setCategories(userId) {
    let result = await window.category.getAllCategories(userId);
    let html;
    let i = 1;
    result.getAllCategories.forEach(category => {
        html += `<li><a class="dropdown-item" href="../html/main.html?user=${userId}&category-name=${category.name}">${category.name}</a></li>`
        i++;
    });
    productCategory.innerHTML = html;
}

async function showProductsList(categoryName) {
    if (categoryName != null) {
        const obj = {
            userId: userId,
            categoryName: categoryName
        }
        let result = await window.product.getAllProductsOfCategory(obj);
        let html;
        result.getAllProductsOfCategory.forEach(product => {
            if (product.stock < product.stock_min) {
                html += `<a href="../html/productDetail.html?user=${userId}&category-name=${categoryName}&product-id=${product.id}" class="list-group-item list-group-item-action"><div class="row justify-content-between"><div class="col-4">${product.name}</div><div class="col-4 text-danger">${product.stock}</div></div></a>`;
            } else {
                html += `<a href="../html/productDetail.html?user=${userId}&category-name=${categoryName}&product-id=${product.id}" class="list-group-item list-group-item-action"><div class="row justify-content-between"><div class="col-4">${product.name}</div><div class="col-4">${product.stock}</div></div></a>`;
            }
        });
        list.innerHTML = html;
    }else{
        let result = await window.product.getAllProducts(userId);
        console.log(result);
        let html;
        result.getAllProducts.forEach(product => {
            if (product.stock < product.stock_min) {
                html += `<a href="../html/productDetail.html?user=${userId}&category-name=${categoryName}&product-id=${product.id}" class="list-group-item list-group-item-action"><div class="row justify-content-between"><div class="col-4">${product.name}</div><div class="col-4 text-danger">${product.stock}</div></div></a>`;
            } else {
                html += `<a href="../html/productDetail.html?user=${userId}&category-name=${categoryName}&product-id=${product.id}" class="list-group-item list-group-item-action"><div class="row justify-content-between"><div class="col-4">${product.name}</div><div class="col-4">${product.stock}</div></div></a>`;
            }
        });
        list.innerHTML = html;
    }
}

setCategories(userId);
showProductsList(categoryName);
setClickEventOfMenu(userId);