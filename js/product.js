var query = location.search;
var value = query.split('=');
const list = document.getElementById('productList');

categoryName = decodeURIComponent(value[1]);
// console.log(decodeURIComponent(value[1]));

async function showProductsList(name) {
    result = await window.product.getAllProducts(name);
    let html;
    result.getAllProducts.forEach(product => {
        html += `<a href="#" class="list-group-item list-group-item-action">${product.name}</a>`
    });
    list.innerHTML = html;
}

showProductsList(categoryName);