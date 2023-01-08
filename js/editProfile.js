import { setClickEventOfMenu } from "./common.js";

const params = new URLSearchParams(location.search);
const userId = params.get('user');
const editBTN = document.getElementById('editBTN');
const editPassBTN = document.getElementById('editPassBTN');
const inputName = document.getElementById('inputName');
const inputEmail = document.getElementById('inputEmail');
const userThumbnail = document.getElementById('userThumbnail');
const changeUserImageBTN = document.getElementById('changeUserImageBTN');
let actualImage;

async function setProfile(userId) {
    let result = await window.auth.getProfile(userId);
    inputName.value = result.getProfile.name;
    inputEmail.value = result.getProfile.email;
    actualImage = result.getProfile.thumbnail;
    userThumbnail.setAttribute('src', result.getProfile.thumbnail);

    changeUserImageBTN.addEventListener('click', async () => {
        let filePath;
        const imgFile = await window.product.chooseImg();
        if (imgFile.chooseImg.canceled) {
            return;
        }
        filePath = imgFile.chooseImg.filePaths[0];
        const obj = {
            userId: userId,
            filePath: filePath,
            actualImage: actualImage,
        }
        console.log(obj);
        await window.auth.changeUserImage(obj);
        location.reload();
    })
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