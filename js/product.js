const list = document.getElementById('productList');
let params = new URLSearchParams(location.search);
const userId = params.get('user');
const categoryName = params.get('category-name');
import { setClickEventCreateProduct, setClickEventOfMenu } from './common.js';

const createProductBTN = document.getElementById('createProductBTN');


async function showProductsList(categoryName) {
    let result = await window.product.getAllProducts(categoryName);
    console.log(result);
    let html;
    result.getAllProducts.forEach(product => {
        html += `<a href="../html/productDetail.html?user=${userId}&product-name=${product.name}&product-id=${product.id}" class="list-group-item list-group-item-action">${product.name}</a>`
    });
    list.innerHTML = html;
}

console.log(userId);
showProductsList(categoryName);
setClickEventCreateProduct(userId);
setClickEventOfMenu(userId);