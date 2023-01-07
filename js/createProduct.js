import { setClickEventOfMenu, checkIfNotEmpty, isValidHttpUrl } from './common.js';

let params = new URLSearchParams(location.search);
const userId = params.get('user');
const createProductBTN = document.getElementById('createProductBTN');
const chooseFileBTN = document.getElementById('chooseFileBTN');
const productName = document.getElementById('productName');
const productUrl = document.getElementById('productUrl');
const cantidad = document.getElementById('cantidad');
const cantidadMin = document.getElementById('cantidadMin');
const productImg = document.getElementById('productImg');
const description = document.getElementById('description');
const productCategory = document.getElementById('ddlViewBy');

createProductBTN.addEventListener('click', async (event) => {

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

chooseFileBTN.addEventListener('click', async () => {
    const imgFile = await window.product.chooseImg();
    if (imgFile.chooseImg.canceled) {
        productImg.value = '';
    }else{
        productImg.value = imgFile.chooseImg.filePaths[0];
    }
})

setCategories(userId);
setClickEventOfMenu(userId);