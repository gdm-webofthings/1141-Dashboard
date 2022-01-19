const { JsonDB } = require("node-json-db");
const { Config } = require("node-json-db/dist/lib/JsonDBConfig");
const appData = require("../appData");
const isDev = require("electron-is-dev");

const initDataBase = (app) => {
  appData.dataBase = new JsonDB(
    isDev
      ? new Config("dataBase", true, true, "/")
      : new Config(app.getPath("userData") + "/dataBase", true, false, "/")
  );

  appData.dataBase.push(
    "/",
    {
      players: 3,
      clients: {
        "Client-00": {
          id: "Client-00",
          puzzleName: "Tip-screen",
          currentState: 0,
          status: 1,
        },
      },
      cameras: {
        "Camera-00": {
          id: "Camera-00",
          src: "192.168.0.248",
          port: 5000,
          cameraName: "Testercam",
        }
      },
      lightIP: '0.0.0.0'
    },
    false
  );
};

module.exports = {
  initDataBase,
};
