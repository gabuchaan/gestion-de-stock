import { setClickEventOfMenu } from './common.js';

const params = new URLSearchParams(location.search);
const userId = params.get('user');
const productName = params.get('product-name');
const productId = params.get('product-id');
const productTitle = document.getElementById('productTitle');
const urlValue = document.getElementById('urlValue');
const quantityValue = document.getElementById('quantityValue');
const minQuantityValue = document.getElementById('minQuantityValue');
const categoryValue = document.getElementById('categoryValue');
const descriptionValue = document.getElementById('descriptionValue');


async function setProductValues() {
    let result = await window.product.getProduct(productId);
    console.log(result);
    productTitle.innerText = result.getProduct.name;
    urlValue.innerText = result.getProduct.web_url;
    quantityValue.innerText = result.getProduct.stock;
    minQuantityValue.innerText = result.getProduct.stock_min;
    categoryValue.innerText = result.getProduct.category_name;
    descriptionValue.innerText = result.getProduct.description;
}
console.log(location.search);
setProductValues();
setClickEventOfMenu(userId);