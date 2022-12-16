// const { ipcRenderer } = require('electron');

// let loginBtn;
// let userName;
// let password;

// window.onload = function() {
//     loginBtn = document.getElementById('login');
//     userName = document.getElementById('userName');
//     password =document.getElementById('password');

//     loginBtn.onclick = function(){
//         const obj ={
//             userName:  userName.value,
//             password: password.value,
//         }
//         ipcRenderer.invoke("login", obj)
//     }
// }