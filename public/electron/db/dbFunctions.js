const { formatGetClients, formatClientForDB } = require("./formatFunctions");
const appData = require("../appData");

// Send client data to render process
const sendClients = () => {
  // Send the data to render process
  appData.mainWindow.webContents.send("dataChange", formatGetClients());
};

// Save new client-data
const saveClient = (data) => {
  appData.dataBase.push(
    `/clients/Client-${data.id}`,
    formatClientForDB(data),
    true
  );

  // Send the updated data
  sendClients();
};

const setPlayers = (players) => {
  appData.dataBase.push(`/players`, players);

  // Send the updated data
  sendClients();
};

// Delete client
const deleteClient = (client) => {
  appData.dataBase.delete(`/clients/${client}`);

  // Send the updated data
  sendClients();
};

const saveOnState = ({ onState, currentClient }) => {
  appData.dataBase.push(`/clients${currentClient}/onState`, onState);

  // Send the updated data
  sendClients();
};

// Save incoming client-state
const saveState = ({ address, args }) => {
  // get the client's data
  const obj = appData.dataBase.getData(`/clients${address}`);

  // Add new state to data and save to db
  appData.dataBase.push(`/clients${address}`, {
    ...obj,
    currentState: args[0].value,
  });

  // Send the updated data
  sendClients();
};

// Get IP of light API
const getLightIp = () => {
  return appData.dataBase.getData("/lightIP");
}

const saveLightIp = (ip) => {
  appData.dataBase.push("/lightIP", ip, true);
  sendClients();
}

module.exports = {
  sendClients,
  saveClient,
  deleteClient,
  saveState,
  saveOnState,
  setPlayers,
  getLightIp,
  saveLightIp,
};
