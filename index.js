const electron = require("electron");
const path = require("path");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const url = require("url");

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({ width: 1000, height: 800, webPreferences: { nodeIntegration: true }, resizable: true, maximizable: true });
    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "index.html"),
            protocol: "file:",
            slashes: true
        })
    );
    mainWindow.maximize();
    mainWindow.setMenu(null);
    mainWindow.webContents.openDevTools();
    mainWindow.setIcon(path.join(__dirname, "img", "4541-logo-2.ico"));
    mainWindow.on("closed", function() {
        mainWindow = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", function() {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", function() {
    if (mainWindow === null) {
        createWindow();
    }
});
