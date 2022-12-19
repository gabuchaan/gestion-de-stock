const createProductBTN = document.getElementById('createProductBTN');
const message = document.getElementById('message');
const productCategory = document.getElementById('ddlViewBy');

createProductBTN.addEventListener('click', async (event) => {
    const productName = document.getElementById('productName');
    const productUrl = document.getElementById('productUrl');
    const cantidad = document.getElementById('cantidad');
    const cantidadMin = document.getElementById('cantidadMin');
    const productImg = document.getElementById('productImg');
    const description = document.getElementById('description');
    const productCategory = document.getElementById('ddlViewBy');

    const obj = {
        productName: productName.value,
        productUrl: productUrl.value,
        cantidad: cantidad.value,
        cantidadMin: cantidadMin.value,
        productImg: productImg.value,
        description: description.value,
        productCategory: productCategory.options[productCategory.selectedIndex].text,
    }
    console.log(obj);

    result = await window.product.createProduct(obj);
    console.log(result);
    // message.innerText = result.createCategory
});

async function setCategories() {
    result = await window.category.getAllCategories();
    let html;
    let i = 1;
    result.getAllCategories.forEach(category => {
        // html += `<a href="#" class="list-group-item list-group-item-action categoryListItem">${category.name}</a>`
        // html += `<li><a class="dropdown-item" href="#">${category.name}</a></li>`
        html += `<option value="${i}">${category.name}</option>`
        i++;
    });
    productCategory.innerHTML = html;
}

setCategories();