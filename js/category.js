const list = document.getElementById('categoryList');



async function showCategoryList(params) {
    result = await window.category.getAllCategories();
    console.log(result.getAllCategories);
    let html;
    result.getAllCategories.forEach(category => {
        html += `<a href="#" class="list-group-item list-group-item-action">${category.name}</a>`
    });
    list.innerHTML = html;
}



showCategoryList();