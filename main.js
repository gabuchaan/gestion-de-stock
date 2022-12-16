const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./test.db');

let  mainWindow;
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

ipcMain.handle('login', (event, obj) => {
    let result = validateLogin(obj);
    if (!result) {
        return {'login': false}
    }
});

ipcMain.handle('register', (event, obj) => {
    validateRegister(obj);
});

// ----------------- FUNCTIONS ----------------


        // ----- LOGIN -----

function validateLogin(obj) {
    const password = obj.password;
    const userName = obj.userName;
    db.all("SELECT * FROM users where name = ? AND password = ?", [userName, password], (err, rows) => {
        if (rows.length > 0) {
            createMainWindow();
            mainWindow.show();
            loginWindow.close();
        }
        return false
    });
    // db.close();
}

function showNotification() {
    new Notification({
        title: "login",
        body: "Login incorrect"
    }).show();
}

        // ----- REGISTER -----

function validateRegister(obj) {
    console.log(obj);
}