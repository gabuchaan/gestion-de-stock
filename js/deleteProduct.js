const params = new URLSearchParams(location.search);
const userId = params.get('user');
const categoryName = params.get('category-name');
const productId = params.get('product-id');
const deleteBTN = document.getElementById('deleteProductBTN');
const cancelBTN = document.getElementById('cancelProductBTN');

deleteBTN.addEventListener('click', async () => {
    await window.opener.product.deleteProduct(productId);
    window.opener.location.href = `../html/product.html?user=${userId}&category-name=${encodeURIComponent(categoryName) }`;
    window.close();
});

cancelBTN.addEventListener('click', () => {
    window.close();
})
