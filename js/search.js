import { setClickEventOfMenu } from "../js/common.js";

let params = new URLSearchParams(location.search);
const userId = params.get('user');
const searchProductBTN = document.getElementById('searchProductBTN');
const searchWord = document.getElementById('searchWord');
const list = document.getElementById('productList');

searchWord.addEventListener('input', () => {
    console.log(searchWord.value.length);
    if (searchWord.value.length != 0) {
        searchProductBTN.removeAttribute("disabled");
    }else{
        searchProductBTN.setAttribute("disabled", "");
    }
})

searchProductBTN.addEventListener('click', async () => {
    let word = searchWord.value;
    console.log(word);
    const obj = {
        word: word,
        userId: userId,
    }
    let result = await window.product.getSearchedProducts(obj);

    let html;
    result.getSearchedProducts.forEach(product => {
        html += `<a href="../html/productDetail.html?user=${userId}&category-name=${product.categoryName}&product-id=${product.id}" class="list-group-item list-group-item-action">${product.name}</a>`
    });
    list.innerHTML = html;
    console.log(result);
})


setClickEventOfMenu(userId);