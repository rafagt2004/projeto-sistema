const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronRemote', {
    minimizeWindow: () => ipcRenderer.send('window-minimize'),
    maximizeWindow: () => ipcRenderer.send('window-maximize'),
    closeWindow: () => ipcRenderer.send('window-close')
});

