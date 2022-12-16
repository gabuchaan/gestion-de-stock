const { count, log } = require('console');
const { app, BrowserWindow, ipcMain, Notification } = require('electron');
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
    // console.log(validateRegister(obj));
    // validateRegister(obj);
    // let result;
    // await getCountByName(obj).then(val => val = result);

    // asyncFun(obj).then(val => console.log(val));

    result = await asyncFun(obj);
    return result;
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
    let count;
    db.get(`select count(*) from users where name = ?`, obj.userName, (err, row) => {
        if (err) {
            return err;
        }

        console.log(row["count(*)"]);

        return 33;
    });

    // })
    // const email = obj.email;
    // const userName = obj.userName;
    // result = db.all("SELECT * FROM users where name = ?", [userName],(err, rows) => {
    //     console.log(rows.name);
    // });

    // console.log(result);

}

function getCountByName(obj) {
    try {
        return new Promise((resolve, reject) => {
            db.get(`select count(*) from users where name = ?`, obj.userName, (err, row) => {
                if (err) {
                    return reject(err)
                } if (row["count(*)"] != 0) {
                    return resolve("El nombre ya está usado")
                } else {
                    return resolve(true)
                }
            })
        })
        
    } catch (error) {
        return error;
    }
}

function getCountByEmail(obj) {
    try {
        return new Promise((resolve, reject) => {
            console.log("ok");
            db.get(`select count(*) from users where email = ?`, obj.email, (err, row) => {
                if (err) {
                    return reject(err)
                } if (row["count(*)"] != 0) {
                    return resolve("El nombre ya está usado")
                } else {
                    return resolve(true)
                }
            })
        })
        
    } catch (error) {
        return error;
    }
}

async function asyncFun(params) {

    const resultName = await getCountByName(params);
    const resultEmail = await getCountByEmail(params);


    return result;
}

