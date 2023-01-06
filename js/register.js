import { checkIfNotEmpty, checkIfEmail } from './common.js'; 

const registerBtn = document.getElementById('registerBtn');
const message = document.getElementById('message');
const userName = document.getElementById('userNameInput');
const email = document.getElementById('emailInput');
const password = document.getElementById('passwordInput');

registerBtn.addEventListener('click', async (event) => {
    console.log('hola');
    const obj = {
        userName: userName.value,
        email: email.value,
        password: password.value
    }

    console.log(checkIfNotEmpty(obj.userName));

    if (!checkIfNotEmpty(obj.userName)) {
        alert("El nombre es obligatorio.");
        return;
    }
    if (!checkIfNotEmpty(obj.password)) {
        alert("El password es obligatorio.");
        return;
    }

    if (!checkIfEmail(obj.email)) {
        alert('El Email no tiene formato de Email')
        return;
    }


    let result = await window.tryRegister.register(obj);
    if (result.register === "ok") {
        const result = await window.tryRegister.login(obj);
        if (!result.login) {
            message.innerText = "Login incorrect";
        }
        window.location.href = '../html/main.html?user=' + encodeURIComponent(result.login);
    } else {
        alert(result.register);
    }
})

