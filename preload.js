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
    deleteCategory: (obj) => ipcRenderer.invoke("deleteCategory", obj),
})

contextBridge.exposeInMainWorld('product', {
    createProduct: (obj) => ipcRenderer.invoke("createProduct", obj),
    getAllProductsOfCategory: (obj) => ipcRenderer.invoke('getAllProductsOfCategory', obj),
    getAllProducts: (userId) => ipcRenderer.invoke('getAllProducts', userId),
    getProduct: (productId) => ipcRenderer.invoke('getProduct', productId),
    updateProduct: (obj) => ipcRenderer.invoke("updateProduct", obj),
    deleteProduct: (productId) => ipcRenderer.invoke('deleteProduct', productId),
    getSearchedProducts: (obj) => ipcRenderer.invoke('getSearchedProducts', obj),
    changeFavorite: (productId) => ipcRenderer.invoke("changeFavorite", productId),
})



