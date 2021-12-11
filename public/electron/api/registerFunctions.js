/**
 * Register different action listeners
 */

const { ipcMain } = require("electron");
const {
  saveClient,
  deleteClient,
  saveOnState,
  setPlayers,
  getLightIp,
  saveLightIp,
} = require("../db/dbFunctions");
const { formatGetClients } = require("../db/formatFunctions");
const actionsFilter = require("./globalActions/actionsFilter");
const { checkLive } = require("./globalActions/checkLive");
const { sendMessage } = require("./sendMessage");
const { sendTip } = require("./sendTip");

module.exports = () => {
  ipcMain.on("send", (e, args) => sendMessage(args));
  ipcMain.on("action", (e, args) => actionsFilter(args));
  ipcMain.on("getClients", (e, arg) => {
    e.returnValue = formatGetClients();
  });
  ipcMain.on("saveClient", (e, args) => {
    saveClient(args);
    // Check the live status of all clients after creating a new client
    checkLive();
  });
  ipcMain.on("deleteClient", (e, args) => deleteClient(args));
  ipcMain.on("saveOnState", (e, args) => saveOnState(args));
  ipcMain.on("sendTip", (e, args) => sendTip(args));
  ipcMain.on("checkLive", (e, args) => checkLive());
  ipcMain.on("setPlayers", (e, args) => setPlayers(args));
  ipcMain.on("endGame", (e, args) => console.log("game ended"));
  ipcMain.on("getLightIp", (e, args) => e.returnValue = getLightIp())
  ipcMain.on("saveLightIp", (e, args) => { saveLightIp(args) })
};
