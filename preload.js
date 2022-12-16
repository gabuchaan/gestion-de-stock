const  { ipcRenderer,contextBridge }  = require('electron');

contextBridge.exposeInMainWorld('tryLogin', {
    login: (obj) => ipcRenderer.invoke("login", obj),
})

contextBridge.exposeInMainWorld('tryRegister', {
    register : (obj) => ipcRenderer.invoke("register", obj),
    login : (obj) => ipcRenderer.invoke("login", obj),
})



