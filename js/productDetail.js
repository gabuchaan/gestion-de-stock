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
const showWebBTN = document.getElementById('showWebBTN');
const favoriteBTN = document.getElementById('favoriteBTN');
const productImage = document.getElementById('productImage');
const webLink = document.getElementById('webLink');

async function setProductValues() {
    const result = await window.product.getProduct(productId);
    productTitle.innerText = result.getProduct.name;
    urlValue.innerText = result.getProduct.web_url;
    quantityValue.innerText = result.getProduct.stock;
    minQuantityValue.innerText = result.getProduct.stock_min;
    categoryValue.innerText = result.getProduct.category_name;
    descriptionValue.innerText = result.getProduct.description;
    productImage.setAttribute('src', result.getProduct.image)

    if(result.getProduct.favorite == 0){
        favoriteBTN.innerHTML = '<img src="../Img/star_25.png" alt="homeBtn" width="30" height="30" id="favoriteIcon">'
    }else{
        favoriteBTN.innerHTML = '<img src="../Img/star-icon.png" alt="homeBtn" width="30" height="30" id="favoriteIcon">'
    }

    if(result.getProduct.web_url == ""){
        showWebBTN.setAttribute('disabled', "");
    }else{
        webLink.setAttribute('href', result.getProduct.web_url);
    }
    
}

favoriteBTN.addEventListener('click', async () => {
    await window.product.changeFavorite(productId);
    window.location.href = `../html/productDetail.html?user=${userId}&category-name=${categoryName}&product-id=${productId}`;
})

deleteProductBTN.addEventListener('click', () => {
    window.open(`../html/productDelete.html?user=${userId}&product-id=${productId}&category-name=${categoryName}`, "Confirm", "width=400,height=300");
})
setProductValues();
setClickEventEditProduct(userId, productId);
setClickEventOfMenu(userId);