const { BrowserWindow } = require("electron");

const electronIsDev = require("electron-is-dev");
const path = require("path");

const openCameras = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Load file
  win.loadURL(
    electronIsDev
      ? "http://localhost:3000/Cameras"
      : `file://${path.join(__dirname, "../../build/index.html")}`
  );
};

module.exports = {
  openCameras,
};
