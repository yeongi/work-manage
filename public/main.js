const { app, BrowserWindow } = require("electron");

const path = require("path");
const isDev = require("electron-is-dev");

const remote = require("@electron/remote/main");
remote.initialize();

function createWindow() {
  const win = new BrowserWindow({
    width: 1600,
    height: 900,
    autoHideMenuBar: true,
    icon: path.join(__dirname, "assets/icons/docunment.ico"),
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
  });

  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  remote.enable(win.webContents);
}
console.log(process.env);
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  console.log("App running in production mode");
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
