
function setClickEventOfMenu(userId) {
    categoryBTN.addEventListener('click', (e) => {
        console.log('hola');
        window.location.href = '../html/category.html?user=' +  userId;
    });

    editProfileBTN.addEventListener('click', () => {
        window.location.href = '../html/editProfile.html?user=' + userId;
    })

    searchBTN.addEventListener('click', () => {
        window.location.href = `../html/search.html?user=${userId}`;
    })

    logoutBTN.addEventListener('click', () => {
        window.location.href = '../index.html';
    })
}

function setClickEventCreateCategory(userId) {
    createCategoryBTN.addEventListener('click', () => {
        window.location.href = '../html/createCategory.html?user=' +  userId;
    });
}

function setClickEventCreateProduct(userId) {
    createProductBTN.addEventListener('click', () => {
        window.location.href = '../html/createProduct.html?user=' + userId;
    });
}

function setClickEventEditProduct(userId,productId) {
    editProductBTN.addEventListener('click', () => {
        window.location.href = '../html/editProduct.html?user=' + userId + '&product-id=' + productId;
    });
}

export { setClickEventOfMenu, setClickEventCreateCategory, setClickEventCreateProduct, setClickEventEditProduct};