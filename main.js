
const { app, BrowserWindow, ipcMain, Notification, shell, dialog } = require('electron');
const { resolve } = require('path');
const fs = require('fs');
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


    const handleUrlOpen = (e, url) => {
        if (url.match(/^http/)) {
            e.preventDefault();
            shell.openExternal(url);
        }
    }
    loginWindow.webContents.on('will-navigate', handleUrlOpen);
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
    // global.userId = result;
    return { 'login': result }
});

ipcMain.handle('register', async (event, obj) => {
    let result = await validateRegister(obj);
    if (result === "ok") {
        createUser(obj);
    }
    return { 'register': result };
});

// ----- USER -----

ipcMain.handle('getProfile', async (event, userId) => {
    let result = await getProfile(userId);
    return { 'getProfile': result };
})

ipcMain.handle('editProfile', async (event, obj) => {
    editProfile(obj);
})

ipcMain.handle('changePass', async (event, obj) => {

    changePass(obj);
})

ipcMain.handle('changeUserImage', async (event, obj) => {
    deleteActualUserImage(obj);
    const imagePath = await saveUserImageFile(path.join(__dirname, `\\Img\\UserImage\\${obj.userId}`), obj.filePath);
    updateUserImage(obj, imagePath);
})

// ----- CATEGORY -----

ipcMain.handle('createCategory', async (event, obj) => {
    result = await validateCategory(obj);
    if (!result) {
        // return { 'createCategory': "La categoria ya existe." }
        return { 'createCategory': false }
    }
    createCategory(obj);
    // return { 'createCategory': "Se ha creado correctamente la categoria." }
    return { 'createCategory': true }
});

ipcMain.handle('getAllCategories', async (event, userId) => {
    result = await getCategories(userId);
    return { 'getAllCategories': result };
});

ipcMain.handle('deleteCategory', async (event, obj) => {
    let categoryId = await getCategoryId(obj);
    await deleteProducts(categoryId);
    await deleteCategory(categoryId);
})

// ----- PRODUCT -----

ipcMain.handle('getAllProductsOfCategory', async (event, obj) => {
    result = await getProducts(obj);
    return { 'getAllProductsOfCategory': result };
});

ipcMain.handle('createProduct', async (event, obj) => {
    let categoryId = await getCategoryId(obj);
    result = await validateProduct(obj, categoryId);
    if (!result) {
        return { 'createProduct': false };
    }
    const imagePath = saveImageFile(path.join(__dirname, `\\Img\\ProductImage\\${obj.userId}`), obj.productImg);
    obj.productImg = imagePath;
    resultFinal = await createProduct(obj, categoryId);
    return { 'createProduct': true };
});

ipcMain.handle('getProduct', async (event, productId) => {
    result = await getProduct(productId);
    return { 'getProduct': result };
})

ipcMain.handle('updateProduct', async (event, obj) => {
    const categoryId = await getCategoryId(obj);
    const product = await getProduct(obj.productId);

    if (obj.productCategory != product.category_name) {
        result = await validateProduct(obj, categoryId);
        if (!result) {
            return { 'updateProduct': false };
        }
    }
    await updateProduct(obj, categoryId);
    return { 'updateProduct': true };
})

ipcMain.handle('deleteProduct', async (event, productId) => {
    deleteProduct(productId);
})

ipcMain.handle('getSearchedProducts', async (event, obj) => {
    const result = await getSearchedProducts(obj);
    return { 'getSearchedProducts': result };
})

ipcMain.handle('getAllProducts', async (event, userId) => {
    let products = await getAllProducts(userId);
    return { 'getAllProducts': products };
})

ipcMain.handle('changeFavorite', async (event, productId) => {
    await changeFavorite(productId);
})

ipcMain.handle('chooseImg', async () => {
    const file = await dialog.showOpenDialog({filters: [{name: 'Images', extensions: ['jpg', 'png', 'gif']}]});
    return {'chooseImg': file};

})

ipcMain.handle('changeProductImage', async (event, obj) => {
    deleteActualImage(obj);
    const imagePath = await saveImageFile(path.join(__dirname, `\\Img\\ProductImage\\${obj.userId}`), obj.filePath);
    
    await updateImage(obj, imagePath);
    return 'ok';
    
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

// ----- USER -----

function getProfile(userId) {
    return new Promise((resolve, reject) => {
        db.get("SELECT * from users where id = ?", [userId], (err, row) => {
            return resolve(row);
        });
    })
}

function createUser(obj) {
    db.run(`insert into users(name,email,password, thumbnail) values(?,?,?,?)`, [obj.userName, obj.email, obj.password, path.join(__dirname, `\\Img\\default-user-avatar-300x300.png`)]);
}

function editProfile(obj) {
    let data = [obj.name, obj.email, obj.id];
    let sql = `UPDATE users
                SET name=?, email=?
                WHERE id=?`;
    db.run(sql, data);
}

function changePass(obj) {
    let data = [obj.newPassword, obj.id];
    let sql = `UPDATE users
                SET password=?
                WHERE id=?`;
    db.run(sql, data);
}

function saveUserImageFile(directoryPath, imagePath) {
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }
    const randomName = Math.random().toString(36).substring(2,12);
    const fileName = randomName + path.extname(imagePath);
    const filePath = path.join(directoryPath, fileName); 

    fs.copyFile(imagePath, filePath, function(e) {
        if(e) throw e;
    });
    return filePath;
}

// ----- CATEGORY -----

function validateCategory(obj) {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM categories where name = ? and user_id = ?", [obj.categoryName, obj.userId], (err, rows) => {
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

function getCategoryId(params) {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM categories where name = ? and user_id = ?", [params.productCategory, params.userId], (err, rows) => {
            return resolve(rows.id);
        });
    })
}

function deleteCategory(categoryId) {
    let data = [categoryId];
    let sql = "DELETE FROM categories WHERE id=(?)";
    db.run(sql, data);
}

// ----- PRODUCT -----

function getProducts(obj) {
    return new Promise((resolve, reject) => {
        db.all("SELECT products.name, products.id, products.stock, products.stock_min FROM products INNER JOIN categories on categories.id = products.category_id where categories.name = ? AND categories.user_id = ?", [obj.categoryName, obj.userId], (err, rows) => {
            let products = [];
            rows.forEach(function (row) {
                products.push(row);
            });
            return resolve(products);
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
        db.get("SELECT products.name, products.stock, products.stock_min, products.description, products.web_url, products.image, categories.name as category_name, products.favorite FROM products INNER JOIN categories on categories.id = products.category_id where products.id = ?", [params], (err, row) => {

            return resolve(row);
        });
    })
}

function updateProduct(obj, categoryId) {
    let data = [obj.productName, categoryId, obj.web_url, obj.stock, obj.stock_min, obj.description, obj.productId];
    let sql = `UPDATE products
                SET name=?, category_id=?, web_url=?, stock=?, stock_min=?, description=?
                WHERE id=?`;
    db.run(sql, data);
}

function deleteProduct(productId) {
    let data = [productId];
    let sql = "DELETE FROM products WHERE id=(?)";
    db.run(sql, data);
}

function deleteProducts(categoryId) {
    let data = [categoryId];
    let sql = "DELETE FROM products WHERE category_id=(?)";
    db.run(sql, data);
}

function getSearchedProducts(obj) {
    return new Promise((resolve, reject) => {
        db.all("SELECT products.name as name, products.id, products.stock, products.stock_min, categories.name as categoryName FROM products INNER JOIN categories on categories.id = products.category_id WHERE user_id = ? AND products.name LIKE ?", [obj.userId, '%' + obj.word + '%'], (err, rows) => {
            let products = [];
            rows.forEach(function (row) {
                products.push(row);
            });
            return resolve(products);
        });
    });
}

function getAllProducts(userId) {
    return new Promise((resolve, reject) => {
        db.all("SELECT products.name, products.id, products.stock, products.stock_min, categories.name as categoryName, products.favorite FROM products INNER JOIN categories on categories.id = products.category_id where categories.user_id = ?", [userId], (err, rows) => {
            let products = [];
            rows.forEach(function (row) {
                products.push(row);
            });
            return resolve(products);
        });
    })
}

function changeFavorite(productId) {
    db.get(`select * from products where id = ?`, productId, (err, row) => {
        if (row.favorite == 0) {
            let data = [1, productId];
            let sql = `UPDATE products
                        SET favorite = ?
                        WHERE id=?`;
            db.run(sql, data);
        } else {
            let data = [0, productId];
            let sql = `UPDATE products
                        SET favorite = ?
                        WHERE id=?`;
            db.run(sql, data);
        }
    });
}



function saveImageFile(directoryPath, imagePath) {
    if (imagePath.length == 0) {
        return path.join(__dirname, `\\Img\\defaultProduct.jpg`);
    }
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }
    const randomName = Math.random().toString(36).substring(2,12);
    const fileName = randomName + path.extname(imagePath);
    const filePath = path.join(directoryPath, fileName); 

    fs.copyFile(imagePath, filePath, function(e) {
        if(e) throw e;
    });
    return filePath;
}


// ----- COMMON -----

function deleteActualUserImage(obj) {
    console.log(obj.actualImage);
    if (obj.actualImage == path.join(__dirname, `\\Img\\default-user-avatar-300x300.png`)) {
        return;
    }
    fs.unlink(obj.actualImage, function (e) {
        if (e) throw e;
    });
}

function deleteActualImage(obj) {
    if (obj.actualImage == path.join(__dirname, `\\Img\\defaultProduct.jpg`)) {
        return;
    }
    fs.unlink(obj.actualImage, function (e) {
        if (e) throw e;
    });
}

function updateUserImage(obj, newPath) {
    let data = [newPath, obj.userId];
    let sql = `UPDATE users
                SET thumbnail=?
                WHERE id=?`;
    db.run(sql, data);
}

function updateImage(obj, newPath) {
    let data = [newPath, obj.productId];
    let sql = `UPDATE products
                SET image=?
                WHERE id=?`;
    db.run(sql, data);
}