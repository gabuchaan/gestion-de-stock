const createCategoryBTN = document.getElementById('createCategoryBTN');
const message = document.getElementById('message');
var query = location.search;
var value = query.split('=');
const userId = value[1];

createCategoryBTN.addEventListener('click', async (event) => {
    const categoryName = document.getElementById('categoryName');

    const obj = {
        categoryName: categoryName.value,
        userId: userId,
    }

    result = await window.category.createCategory(obj);
    message.innerText = result.createCategory
})
