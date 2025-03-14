require('electron-reload')(__dirname);

const { app, BrowserWindow } = require('electron');
const path = require('path');
const remoteMain = require('@electron/remote/main');
remoteMain.initialize();

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false // Permite o uso do remote
        },
        icon: path.join(__dirname, 'logo.ico'),
        frame: false, // Janela sem moldura
        titleBarStyle: 'hidden' // Oculta a barra de título padrão
    });

    remoteMain.enable(win.webContents);

    win.loadFile('index.html');
    win.setMenu(null); // Remover a barra de menu
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
