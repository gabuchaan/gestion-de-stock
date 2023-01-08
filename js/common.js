
async function setClickEventOfMenu(userId) {

    console.log(userId);
    const userImage = document.getElementById('userImage');
    const userData = await window.auth.getProfile(userId);
    console.log(userData);
    userImage.setAttribute('src', userData.getProfile.thumbnail)

    homeBTN.addEventListener('click', () => {
        window.location.href = '../html/main.html?user=' + userId;
    })

    categoryBTN.addEventListener('click', (e) => {
        window.location.href = '../html/category.html?user=' + userId;
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

    minProductBTN.addEventListener('click', () => {
        window.location.href = '../html/minProduct.html?user=' + userId;
    })
}

function setClickEventCreateCategory(userId) {
    createCategoryBTN.addEventListener('click', () => {
        window.location.href = '../html/createCategory.html?user=' + userId;
    });
}

function setClickEventCreateProduct(userId) {
    createProductBTN.addEventListener('click', () => {
        window.location.href = '../html/createProduct.html?user=' + userId;
    });
}

function setClickEventEditProduct(userId, productId) {
    editProductBTN.addEventListener('click', () => {
        window.location.href = '../html/editProduct.html?user=' + userId + '&product-id=' + productId;
    });
}

function checkIfNotEmpty(str) {
    const value = str.trim();
    if (value.length == 0) {
        return false;
    }
    return true;
}

function checkIfEmail(str) {
    // Regular expression to check if string is email
    const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
    return regexExp.test(str);
}

function isValidHttpUrl(string) {
    let url;
    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
}

export { setClickEventOfMenu, setClickEventCreateCategory, setClickEventCreateProduct, setClickEventEditProduct, checkIfNotEmpty, checkIfEmail, isValidHttpUrl };