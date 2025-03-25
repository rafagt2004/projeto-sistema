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
        minWidth: 1025,
        minHeight: 700,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        },
        frame: false,
        titleBarStyle: 'hidden',
        icon: path.join(__dirname, 'logo.ico')
    });

    mainWindow.loadFile('index.html');

    // ✅ Detecta quando a janela for maximizada manualmente ou por arrastar
    mainWindow.on('maximize', () => {
        mainWindow.webContents.send('window-is-maximized');
    });

    // ✅ Detecta quando a janela for restaurada do estado maximizado
    mainWindow.on('unmaximize', () => {
        mainWindow.webContents.send('window-is-normal');
    });
}

// Cria a janela ao iniciar o app
app.whenReady().then(createWindow);

// Eventos do IPC para minimizar, maximizar/restaurar e fechar
ipcMain.on('window-minimize', () => {
    if (mainWindow) mainWindow.minimize();
});

ipcMain.on('window-maximize', () => {
    if (mainWindow) {
        if (mainWindow.isMaximized()) {
            mainWindow.unmaximize();
        } else {
            mainWindow.maximize();
        }
        // Não é necessário enviar manualmente o estado aqui, 
        // pois os eventos 'maximize' e 'unmaximize' já fazem isso.
    }
});

ipcMain.on('window-close', () => {
    if (mainWindow) mainWindow.close();
});

// Fecha o app quando todas as janelas forem fechadas (exceto no macOS)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

// Para recriar a janela se o app for reaberto no macOS
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
