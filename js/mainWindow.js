import { setClickEventOfMenu } from "./common.js";
const categoryBTN = document.getElementById('categoryBTN');
let params = new URLSearchParams(location.search);
const userId = params.get('user')

    // categoryBTN.addEventListener('click', (e) => {
    //     window.location.href = '../html/category.html?user=' +  userId;
    // });

    setClickEventOfMenu(userId);