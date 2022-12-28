const loginBtn = document.getElementById('login');
let incorrect;
message = document.getElementById('output');

loginBtn.addEventListener('click', async (event) => {
    userName = document.getElementById('userName');
    password =document.getElementById('password');
    const obj ={
        userName:  userName.value,
        password: password.value,
    }

    // result = await window.tryLogin.login(obj);
    // if (!result.login) {
    //     message.innerText = "Login incorrect";
    // }
    result = await window.tryLogin.login(obj);
    if (!result.login) {
        message.innerText = "Login incorrect";
    }
    window.location.href = './html/main.html?user=' +  encodeURIComponent(result.login);
})