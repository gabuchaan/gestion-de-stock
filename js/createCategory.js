const createCategoryBTN = document.getElementById('createCategoryBTN');
const message = document.getElementById('message');
let params = new URLSearchParams(location.search);
const userId = params.get('user');
import { setClickEventOfMenu } from './common.js'; 


createCategoryBTN.addEventListener('click', async (event) => {
    const categoryName = document.getElementById('categoryName');

    const obj = {
        categoryName: categoryName.value,
        userId: userId,
    }

    let result = await window.category.createCategory(obj);
    message.innerText = result.createCategory
})

setClickEventOfMenu(userId);

