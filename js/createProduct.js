const createProductBTN = document.getElementById('createProductBTN');
const message = document.getElementById('message');
const productCategory = document.getElementById('ddlViewBy');
let params = new URLSearchParams(location.search);
const userId = params.get('user');
import { setClickEventOfMenu } from './common.js'; 

createProductBTN.addEventListener('click', async (event) => {
    const productName = document.getElementById('productName');
    const productUrl = document.getElementById('productUrl');
    const cantidad = document.getElementById('cantidad');
    const cantidadMin = document.getElementById('cantidadMin');
    const productImg = document.getElementById('productImg');
    const description = document.getElementById('description');
    const productCategory = document.getElementById('ddlViewBy');

    const obj = {
        userId: userId,
        productName: productName.value,
        productUrl: productUrl.value,
        cantidad: cantidad.value,
        cantidadMin: cantidadMin.value,
        productImg: productImg.value,
        description: description.value,
        productCategory: productCategory.options[productCategory.selectedIndex].text,
    }

    let result = await window.product.createProduct(obj);
    console.log(result);
    if (!result.createProduct) {
        message.innerText = "El producto ya exsiste";
    }
});

async function setCategories(userId) {
    console.log(userId);
    let result = await window.category.getAllCategories(userId);
    console.log(result);
    let html;
    let i = 1;
    result.getAllCategories.forEach(category => {
        html += `<option value="${i}">${category.name}</option>`
        i++;
    });
    productCategory.innerHTML = html;
}
console.log(userId);
setCategories(userId);
setClickEventOfMenu(userId);