import { setClickEventCreateProduct, setClickEventOfMenu } from './common.js';

const list = document.getElementById('productList');
let params = new URLSearchParams(location.search);
const userId = params.get('user');
const minProductFBTN = document.getElementById('minProductFBTN');
const favoriteProductBTN = document.getElementById('favoriteProductBTN');

minProductFBTN.addEventListener('click', () => {
    showProductsListMin();
    favoriteProductBTN.removeAttribute("disabled");
    minProductFBTN.setAttribute('disabled', '');
})

favoriteProductBTN.addEventListener('click', () => {
    showProductsListFavorite();
    minProductFBTN.removeAttribute("disabled");
    favoriteProductBTN.setAttribute('disabled', '');
})



async function showProductsListMin() {
    let result = await window.product.getAllProducts(userId);
    let html;
    result.getAllProducts.forEach(product => {
        if (product.stock < product.stock_min) {
            html += `<a href="../html/productDetail.html?user=${userId}&category-name=${product.categoryName}&product-id=${product.id}" class="list-group-item list-group-item-action"><div class="row justify-content-between"><div class="col-4">${product.name}</div><div class="col-4 text-danger">${product.stock}</div></div></a>`;
        }
    });
    list.innerHTML = html;
}

async function showProductsListFavorite() {
    let result = await window.product.getAllProducts(userId);
    let html;
    result.getAllProducts.forEach(product => {
        if (product.favorite == 1) {
            if (product.stock < product.stock_min) {
                html += `<a href="../html/productDetail.html?user=${userId}&category-name=${product.categoryName}&product-id=${product.id}" class="list-group-item list-group-item-action"><div class="row justify-content-between"><div class="col-4">${product.name}</div><div class="col-4 text-danger">${product.stock}</div></div></a>`;
            }else{
                html += `<a href="../html/productDetail.html?user=${userId}&category-name=${product.categoryName}&product-id=${product.id}" class="list-group-item list-group-item-action"><div class="row justify-content-between"><div class="col-4">${product.name}</div><div class="col-4">${product.stock}</div></div></a>`;
            }
        }
    });
    list.innerHTML = html;
}

showProductsListMin();
setClickEventOfMenu(userId);