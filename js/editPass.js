import { setClickEventOfMenu } from "./common.js";

const params = new URLSearchParams(location.search);
const userId = params.get('user');

const password = document.getElementById('inputPassword');
const newPassword = document.getElementById('inputNewPassword');
const confirmPassword = document.getElementById('inputConfirmPassword');
const editPassBTN = document.getElementById('editPassBTN');

editPassBTN.addEventListener('click', async () => {
    // Check if the password is correct.
    const obj = {
        id: userId,
        password: password.value,
        newPassword: newPassword.value,
        confirmPassword: confirmPassword.value,
    }

    let userData = await window.auth.getProfile(userId);


    if (userData.getProfile.password != obj.password) {
        alert('Password incorrect');
        return;
    }

    if (obj.newPassword != obj.confirmPassword) {
        alert('El nuevo password es incorrecto.');
        return;
    }

    await window.auth.changePass(obj);
    location.href = '../html/editProfile.html?user=' + userId;
})

