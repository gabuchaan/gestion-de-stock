import { setClickEventOfMenu, checkIfNotEmpty } from './common.js'; 

const createCategoryBTN = document.getElementById('createCategoryBTN');
let params = new URLSearchParams(location.search);
const userId = params.get('user');

createCategoryBTN.addEventListener('click', async (event) => {
    const categoryName = document.getElementById('categoryName');

    const obj = {
        categoryName: categoryName.value,
        userId: userId,
    }

    if (!checkIfNotEmpty(obj.categoryName)) {
        alert("El nombre de categoria es obligatorio.");
        return;
    }

    let result = await window.category.createCategory(obj);

    if(result.createCategory == true){
        window.location.href = '../html/category.html?user=' +  userId;
    }else{
        alert("La categoria ya existe.");
    }
})

setClickEventOfMenu(userId);

