
const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./test.db');

let mainWindow;
let loginWindow;

// ---------------------------------------------
// -------------- WINDOW CREATOR ---------------
// ---------------------------------------------

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile('index.html');
}

const createLoginWindow = () => {
    loginWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    loginWindow.webContents.openDevTools();
    loginWindow.loadFile('index.html');
}

const createMainWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.webContents.openDevTools();
    mainWindow.loadFile('html/main.html');
}
// -------------------------------------------
// -------------- APP MANAGER ----------------
// -------------------------------------------

app.whenReady().then(() => {
    createLoginWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createLoginWindow();
        }
    })
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// ----------------------------------------
// ----------------- IPC ------------------
// ----------------------------------------

        // ----- LOGIN -----

ipcMain.handle('login', async (event, obj) => {
    let result = await validateLogin(obj);
    // if (!result) {
    //     return { 'login': false }
    // }
    // console.log(result);
    // global.userId = result;
    return { 'login': result }
});

ipcMain.handle('register', async (event, obj) => {
    let result = await validateRegister(obj);
    if (result === "ok") {
        await createUser(obj);
    }
    return { 'register': result };
});

        // ----- CATEGORY -----

ipcMain.handle('createCategory', async (event, obj) => {
    result = await validateCategory(obj);
    if (!result) {
        return { 'createCategory': "La categoria ya existe." }
    }
    createCategory(obj);
    return { 'createCategory': "Se ha creado correctamente la categoria." }

});

ipcMain.handle('getAllCategories', async (event, userId) => {
    result = await getCategories(userId);
    return { 'getAllCategories': result };
});

// ----- PRODUCT -----

ipcMain.handle('getAllProducts', async (event, categoryName) => {
    result = await getProducts(categoryName);
    return { 'getAllProducts': result };
});

ipcMain.handle('createProduct', async (event, obj) => {
    categoryId = await getCategoryId(obj);
    result = await validateProduct(obj, categoryId);
    console.log(result);
    if (!result) {
        return {'createProduct' : false};
    }
    resultFinal = await createProduct(obj, categoryId);
    return { 'createProduct': true};
});

ipcMain.handle('getProduct', async(event, productId) => {
    result = await getProduct(productId);
    return {'getProduct': result};
})

// --------------------------------------------
// ----------------- FUNCTIONS ----------------
// --------------------------------------------

        // ----- LOGIN -----

function validateLogin(obj) {

    const password = obj.password;
    const userName = obj.userName;
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM users where name = ? AND password = ?", [userName, password], (err, row) => {
            if (row != null) {
                return resolve(row.id);
            }
            return resolve(false);
        });
    })
    // db.close();
}

        // ----- REGISTER -----

function validateRegister(obj) {
    try {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.get(`select count(*) from users where name = ?`, obj.userName, (err, row) => {
                    if (err) {
                        return reject(err)
                    }
                    if (row["count(*)"] != 0) {
                        return resolve("El nombre ya está usado")
                    } else {
                        db.get(`select count(*) from users where email = ?`, obj.email, (err, row) => {
                            if (err) {
                                return reject(err)
                            }
                            if (row["count(*)"] != 0) {
                                return resolve("El Email ya está usado")
                            } else {
                                return resolve("ok");
                            }
                        });
                    }
                });
            })
        })
    } catch (error) {
        return error;
    }
}

function createUser(obj) {
    db.run(`insert into users(name,email,password) values(?,?,?)`, [obj.userName, obj.email, obj.password]);
}

        // ----- CATEGORY -----

function validateCategory(obj) {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM categories where name = ? and user_id = ?", [obj.categoryName, obj.userId], (err, rows) => {
            console.log(rows.length);
            if (rows.length == 0) {
                return resolve(true)
            }
            return resolve(false);

        });
    })
}

function createCategory(obj) {
    db.run(`insert into categories(name, user_id) values(?,?)`, [obj.categoryName, obj.userId]);
}

function getCategories(userId) {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM categories where user_id = ?", [userId], (err, rows) => {
            let categories = [];
            rows.forEach(function (row) {
                categories.push(row);
            });
            return resolve(categories);
        });
    });
}


        // ----- PRODUCT -----

function getProducts(params) {
    return new Promise((resolve, reject) => {
        db.all("SELECT products.name, products.id FROM products INNER JOIN categories on categories.id = products.category_id where categories.name = ?", [params], (err, rows) => {
            let products = [];
            rows.forEach(function (row) {
                products.push(row);
            });
            return resolve(products);
        });
    })
}

function getCategoryId(params) {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM categories where name = ?", [params.productCategory], (err, rows) => {
            return resolve(rows.id);
        });
    })
}

function validateProduct(obj, categoryId) {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM products where category_id = ? and name = ?", [categoryId, obj.productName], (err, rows) => {
            if (rows.length == 0) {
                return resolve(true);
            }
            return resolve(false);
        });
    })
}

function createProduct(obj, categoryId) {
    db.run(`insert into products(name,category_id,image,web_url,stock,description,stock_min) values(?,?,?,?,?,?,?)`, [obj.productName, categoryId, obj.productImg, obj.productUrl, obj.cantidad, obj.description, obj.cantidadMin]);
}

function getProduct(params) {
    return new Promise((resolve, reject) => {
        db.get("SELECT products.name, products.stock, products.stock_min, products.description, products.web_url, categories.name as category_name FROM products INNER JOIN categories on categories.id = products.category_id where products.id = ?", [params], (err, row) => {
            console.log(row);
            
            return resolve(row);
        });
    })
}
