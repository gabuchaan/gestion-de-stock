import { setClickEventOfMenu, setClickEventEditProduct } from './common.js';

const params = new URLSearchParams(location.search);
const userId = params.get('user');
const productId = params.get('product-id');
const categoryName = params.get('category-name');
const productTitle = document.getElementById('productTitle');
const urlValue = document.getElementById('urlValue');
const quantityValue = document.getElementById('quantityValue');
const minQuantityValue = document.getElementById('minQuantityValue');
const categoryValue = document.getElementById('categoryValue');
const descriptionValue = document.getElementById('textareaDescription');
const editProductBTN = document.getElementById('editProductBTN');
const deleteProductBTN = document.getElementById('deleteProductBTN');

console.log(window.location.search);

async function setProductValues() {
    const result = await window.product.getProduct(productId);
    productTitle.innerText = result.getProduct.name;
    urlValue.innerText = result.getProduct.web_url;
    quantityValue.innerText = result.getProduct.stock;
    minQuantityValue.innerText = result.getProduct.stock_min;
    categoryValue.innerText = result.getProduct.category_name;
    descriptionValue.innerText = result.getProduct.description;
}

deleteProductBTN.addEventListener('click', () => {
    let confirm = window.open(`../html/productDelete.html?user=${userId}&product-id=${productId}&category-name=${categoryName}`, "Confirm", "width=400,height=300");
    
})
setProductValues();
setClickEventEditProduct(userId, productId);
setClickEventOfMenu(userId);