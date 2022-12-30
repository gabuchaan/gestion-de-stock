const  { ipcRenderer,contextBridge }  = require('electron');

contextBridge.exposeInMainWorld('auth', {
    login: (obj) => ipcRenderer.invoke("login", obj),
    getProfile: (userId) => ipcRenderer.invoke("getProfile", userId),
    editProfile: (obj) => ipcRenderer.invoke("editProfile", obj),
    changePass: (obj) => ipcRenderer.invoke("changePass", obj),
})

contextBridge.exposeInMainWorld('tryRegister', {
    register : (obj) => ipcRenderer.invoke("register", obj),
    login : (obj) => ipcRenderer.invoke("login", obj),
})

contextBridge.exposeInMainWorld('category', {
    createCategory: (obj) => ipcRenderer.invoke("createCategory", obj),
    getAllCategories: (userId) => ipcRenderer.invoke("getAllCategories", userId),
})

contextBridge.exposeInMainWorld('product', {
    createProduct: (obj) => ipcRenderer.invoke("createProduct", obj),
    getAllProducts: (obj) => ipcRenderer.invoke('getAllProducts', obj),
    getProduct: (productId) => ipcRenderer.invoke('getProduct', productId),
    updateProduct: (obj) => ipcRenderer.invoke("updateProduct", obj),
})



