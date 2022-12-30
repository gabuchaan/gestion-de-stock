import { setClickEventOfMenu } from "./common.js";

const params = new URLSearchParams(location.search);
const userId = params.get('user');
const productId = params.get('product-id');
const editBTN = document.getElementById('editBTN');
const inputUrl = document.getElementById('inputUrl');
const inputStock = document.getElementById('inputStock');
const inputMinStock = document.getElementById('inputMinStock');
const inputName = document.getElementById('inputName');
const productTitle = document.getElementById('productTitle');
const textareaDescription = document.getElementById('textareaDescription');
const productCategory = document.getElementById('ddlViewBy');
// const category = "";

async function setForm(productId) {
    const result = await window.product.getProduct(productId);

    productTitle.innerText = result.getProduct.name;
    inputName.value = result.getProduct.name;
    inputUrl.value = result.getProduct.web_url;
    inputStock.value = result.getProduct.stock;
    inputMinStock.value = result.getProduct.stock_min;
    textareaDescription.value = result.getProduct.description;
    setCategories(userId, result.getProduct.category_name);
    // category = result.getProduct.category_name; 
}

async function setCategories(userId, categoryName) {
    let result = await window.category.getAllCategories(userId);
    let html;
    let i = 1;
    result.getAllCategories.forEach(category => {
        if(category.name == categoryName){
            html += `<option selected value="${i}">${category.name}</option>`
        }else{
            html += `<option value="${i}">${category.name}</option>`
        }
        i++;
    });
    productCategory.innerHTML = html;
}

editBTN.addEventListener('click', async(e) => {
    const obj = {
        productId: productId,
        productName: inputName.value,
        web_url: inputUrl.value,
        stock: inputStock.value,
        stock_min: inputMinStock.value,
        description: textareaDescription.value,
        productCategory: productCategory.options[productCategory.selectedIndex].text,
    }

    let result = await window.product.updateProduct(obj);
    if (!result.updateProduct) {
        console.log('ko');
        alert("El nombre del producto ya existe en la categoria que elegiste.")
        return;
    }else{
        location.href = `../html/productDetail.html?user=${userId}&product-id=${productId}`;
        console.log('ok');
    }
})


setForm(productId);
setClickEventOfMenu(userId);