const loginBtn = document.getElementById('login');
let incorrect;
message = document.getElementById('output');

// message.innerText = "ko";
loginBtn.addEventListener('click', async (event) => {
    userName = document.getElementById('userName');
    password =document.getElementById('password');
    const obj ={
        userName:  userName.value,
        password: password.value,
    }

    incorrect = await window.tryLogin.login(obj);
    if (!incorrect.login) {
        message.innerText = "Login incorrect";
    }
    console.log(incorrect.login);
})