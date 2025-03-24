const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1025,
        height: 700,
        minWidth: 1025, // Define largura mínima
        minHeight: 700, // Define altura mínima
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        },
        frame: false, // Remove a barra padrão do Windows
        titleBarStyle: 'hidden',
        icon: path.join(__dirname, 'logo.ico')
    });

    mainWindow.loadFile('index.html');
}

app.whenReady().then(createWindow);

ipcMain.on('window-minimize', () => {
    if (mainWindow) mainWindow.minimize();
});

ipcMain.on('window-maximize', (event) => {
    if (mainWindow) {
        if (mainWindow.isMaximized()) {
            mainWindow.unmaximize();
            event.sender.send('window-is-normal'); // Notifica que a janela voltou ao estado normal
        } else {
            mainWindow.maximize();
            event.sender.send('window-is-maximized'); // Notifica que a janela está maximizada
        }
    }
});

ipcMain.on('window-close', () => {
    if (mainWindow) mainWindow.close();
});
