const registerBtn = document.getElementById('registerBtn');

registerBtn.addEventListener('click', async (event)=>{
    console.log("ok");
    userName = document.getElementById('userNameInput');
    email = document.getElementById('emailInput');
    password = document.getElementById('passwordInput');

    const obj = {
        userName: userName.value,
        email: email.value,
        password: password.value
    }

    result = await window.tryRegister.register(obj);
})
