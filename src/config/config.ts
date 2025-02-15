import { version } from "../../package.json";

export const config = {
  version: version,
  maintenance: false,
  discord: "https://discord.gg/MonSuperServeur", //Peut etre vide
  teamspeak: "ts3server://ts.arma3.fr", //Peut etre vide
  website: "https://www.google.com", //Peut etre vide
  twitch: "", //Peut etre vide
  youtube: "", //Peut etre vide
  serverName: "Custom Server",
  title: `Custom Server - ${version}`,
  urlMods: "http://82.29.170.30/modsList",
  urlTFR: "http://82.29.170.30/other/task_force_radio.ts3_plugin",
  mdNews: "http://82.29.170.30/news/news.md",
  serverIp: "127.0.0.1",
  serverPort: 2302,
  serverPassword: "password",
  folderModsName: "@MonSuperMods",
};
