import { setClickEventCreateProduct, setClickEventOfMenu } from './common.js';

const list = document.getElementById('productList');
let params = new URLSearchParams(location.search);
const userId = params.get('user');

async function showProductsList() {
    let result = await window.product.getAllProducts(userId);
    console.log(result);
    let html;
    result.getAllProducts.forEach(product => {
        if (product.stock < product.stock_min) {
            html += `<a href="../html/productDetail.html?user=${userId}&category-name=${product.categoryName}&product-id=${product.id}" class="list-group-item list-group-item-action"><div class="row justify-content-between"><div class="col-4">${product.name}</div><div class="col-4 text-danger">${product.stock}</div></div></a>`;
        }
    });
    list.innerHTML = html;
}

showProductsList();
setClickEventOfMenu(userId);