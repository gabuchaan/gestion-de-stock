const { count, log } = require('console');
const { create } = require('domain');
const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const { createSecureServer } = require('http2');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./test.db');

let mainWindow;
let loginWindow;


// -------------- WINDOW CREATOR ---------------

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
            preload: path.join(__dirname, './js/mainWindow.js')
        }
    });

    mainWindow.loadFile('html/main.html');
}

// -------------- APP MANAGER ----------------

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

// ----------------- IPC ------------------

ipcMain.handle('login', async (event, obj) => {
    let result = await validateLogin(obj);
    if (!result) {
        return { 'login': false }
    }
});

ipcMain.handle('register', async (event, obj) => {
    let result = await validateRegister(obj);
    console.log(result);
    if (result === "ok") {
        await createUser(obj);
    }
    return {'register': result};
});

// ----------------- FUNCTIONS ----------------


// ----- LOGIN -----

function validateLogin(obj) {

    const password = obj.password;
    const userName = obj.userName;
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM users where name = ? AND password = ?", [userName, password], (err, rows) => {
            if (rows.length > 0) {
                createMainWindow();
                mainWindow.show();
                loginWindow.close();
            }
            return resolve(false);
        });
    })
    // db.close();
}

// ----- REGISTER -----

function validateRegister(obj) {
    try {
        return new Promise( (resolve, reject) => {
            db.serialize( () => {
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
                            }else{
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
    console.log("ok");
}

