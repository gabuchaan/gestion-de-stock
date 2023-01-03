const params = new URLSearchParams(location.search);
const userId = params.get('user');
const categoryName = params.get('category-name');
const deleteBTN = document.getElementById('deleteBTN');
const cancelBTN = document.getElementById('cancelBTN');

deleteBTN.addEventListener('click', async () => {
    const obj = {
        userId: userId,
        productCategory: categoryName,
    }
    await window.opener.category.deleteCategory(obj);
    window.opener.location.href = `../html/category.html?user=${userId}`;
    window.close();
});

cancelBTN.addEventListener('click', () => {
    window.close();
});