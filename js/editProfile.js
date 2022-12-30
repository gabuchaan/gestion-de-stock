import { setClickEventOfMenu } from "./common.js";

const params = new URLSearchParams(location.search);
const userId = params.get('user');
const editBTN = document.getElementById('editBTN');
const editPassBTN = document.getElementById('editPassBTN');
const inputName = document.getElementById('inputName');
const inputEmail = document.getElementById('inputEmail');

async function setProfile(userId) {
    let result = await window.auth.getProfile(userId);
    inputName.value = result.getProfile.name;
    inputEmail.value = result.getProfile.email;
    console.log(result.getProfile);
}

editBTN.addEventListener('click', async () => {
    // let result = await 
    const name = inputName.value;
    const email = inputEmail.value;

    const obj = {
        id: userId,
        name: name,
        email: email,
    }

    await window.auth.editProfile(obj);
    location.href = '../html/editProfile.html?user=' + userId;
})

editPassBTN.addEventListener('click', () => {
    window.location.href = '../html/changePass.html?user=' +  userId;
})

setClickEventOfMenu(userId);
setProfile(userId);