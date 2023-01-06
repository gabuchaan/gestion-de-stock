import { setClickEventOfMenu, checkIfNotEmpty, isValidHttpUrl } from './common.js';

const createProductBTN = document.getElementById('createProductBTN');
const message = document.getElementById('message');
const productCategory = document.getElementById('ddlViewBy');
let params = new URLSearchParams(location.search);
const userId = params.get('user');

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

    if (!checkIfNotEmpty(obj.productName)) {
        alert("El nombre de producto es obligatorio.");
        return;
    }
    if (!checkIfNotEmpty(obj.cantidad)) {
        obj.cantidad = 0;
    }
    if (!checkIfNotEmpty(obj.cantidadMin)) {
        obj.cantidadMin = 0;
    }

    if(checkIfNotEmpty(obj.productUrl)){
        if(!isValidHttpUrl(obj.productUrl)){
            alert('El formato de URL es incorrecto.');
            return;
        }
    }

    let result = await window.product.createProduct(obj);

    if (!result.createProduct) {
        alert("El producto ya exsiste");
        // message.innerText = "El producto ya exsiste";
    }else{
        window.location.href = `./product.html?category-name=${obj.productCategory}&user=${userId}`;
    }
});

async function setCategories(userId) {
    console.log(userId);
    let result = await window.category.getAllCategories(userId);
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