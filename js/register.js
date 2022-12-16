const registerBtn = document.getElementById('registerBtn');
const message = document.getElementById('message');

registerBtn.addEventListener('click', async (event)=>{
    userName = document.getElementById('userNameInput');
    email = document.getElementById('emailInput');
    password = document.getElementById('passwordInput');

    const obj = {
        userName: userName.value,
        email: email.value,
        password: password.value
    }

    result = await window.tryRegister.register(obj);
    if (result.register === "ok") {
        await window.tryRegister.login(obj);
    }else{
        message.innerText = result.register;
    }
})
