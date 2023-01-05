import { checkIfNotEmpty, checkIfEmail } from './common.js'; 

const registerBtn = document.getElementById('registerBtn');
const message = document.getElementById('message');
userName = document.getElementById('userNameInput');
email = document.getElementById('emailInput');
password = document.getElementById('passwordInput');

registerBtn.addEventListener('click', async (event) => {
    const obj = {
        userName: userName.value,
        email: email.value,
        password: password.value
    }

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


    result = await window.tryRegister.register(obj);
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

