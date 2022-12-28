const categoryBTN = document.getElementById('categoryBTN');
let params = new URLSearchParams(location.search);
const userId = params.get('user')
import { setClickEventOfMenu } from "./common.js";

    // categoryBTN.addEventListener('click', (e) => {
    //     window.location.href = '../html/category.html?user=' +  userId;
    // });

    setClickEventOfMenu(userId);