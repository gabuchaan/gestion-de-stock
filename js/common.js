function test(params) {
    console.log(params);
}

function setClickEventOfMenu(userId) {
    categoryBTN.addEventListener('click', (e) => {
        window.location.href = '../html/category.html?user=' +  userId;
    });
}

function setClickEventCreateCategory(userId) {
    createCategoryBTN.addEventListener('click', () => {
        window.location.href = '../html/creatreCategory.html?user=' +  userId;
    })
}

function setClickEventCreateProduct(userId) {
    createProductBTN.addEventListener('click', () => {
        window.location.href = '../html/createProduct.html?user=' + userId;
    })
}

export {test, setClickEventOfMenu, setClickEventCreateCategory, setClickEventCreateProduct};