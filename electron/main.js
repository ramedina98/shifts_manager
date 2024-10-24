// the basic configuration for the operation of electron...
import { app, BrowserWindow } from 'electron';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import isDev from 'electron-is-dev';

// define __filename and __dirname...
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
        preload: join(__dirname, 'preload.js'),
        nodeIntegration: true,
        contextIsolation: false,
        },
    });

    const appURL = isDev
        ? 'http://localhost:3000'
        : `file://${join(__dirname, '../out/index.html')}`;

    mainWindow.loadURL(appURL);

    if (isDev) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit(); // Cerrar la app en sistemas que no sean macOS
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow(); // Reabrir la ventana cuando se active la app en macOS
    }
});