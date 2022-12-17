const createCategoryBTN = document.getElementById('createCategoryBTN');
const message = document.getElementById('message');

createCategoryBTN.addEventListener('click', async (event) => {
    const categoryName = document.getElementById('categoryName');

    const obj = {
        categoryName: categoryName.value,
    }

    result = await window.createNewCategory.createCategory(obj);
    message.innerText = result.createCategory
})
