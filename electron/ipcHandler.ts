import { ipcMain, BrowserWindow, dialog } from "electron";
import fs from "fs-extra";
import Store from "electron-store";
import Registry from "winreg";
import path from "node:path";
import { config } from "../src/config/config";

// Configuration du store avec des valeurs par défaut
const store = new Store({
  name: "userData",
  cwd: "arma3-data",
  fileExtension: "json",
});

const storeModsListClient = new Store({
  name: "modsListClient",
  cwd: "arma3-data",
  defaults: {
    modsList: [],
  },
  fileExtension: "json",
});
const storeModsListServer = new Store({
  name: "modsListServer",
  cwd: "arma3-data",
  fileExtension: "json",
});

// Fonction pour récupérer le chemin d'Arma 3 depuis le registre Windows
async function getArma3PathFromRegistry(): Promise<string | null> {
  return new Promise((resolve) => {
    const regKey = new Registry({
      hive: Registry.HKLM,
      key: "\\SOFTWARE\\WOW6432Node\\Bohemia Interactive\\Arma 3",
    });
    regKey.get("main", (err, item) => {
      resolve(err || !item ? null : item.value);
    });
  });
}

// Vérifie si le mod Arma 3 est installé
function isModInstalled(arma3Path: string): boolean {
  return fs.existsSync(`${arma3Path}\\${config.folderModsName}`);
}

// Vérifie si le chemin d'Arma 3 est valide
async function isValidArma3Path(path: string): Promise<boolean> {
  return await fs.pathExists(`${path}\\arma3.exe`);
}

// Envoie un message au processus de rendu
function sendMessage(
  win: BrowserWindow,
  message: string,
  success?: string,
  error?: string,
  data?: string,
  fileProgress?: string,
  timeRemaining?: string
) {
  win?.webContents.send("main-process-message", {
    message,
    success,
    error,
    data,
    fileProgress,
    timeRemaining,
  });
}

// Gestionnaire de chargement initial
export function setupIpcHandlers(win: BrowserWindow) {
  // Gestionnaire de chargement initial

  win.webContents.on("did-finish-load", async () => {
    let arma3Path = store.get("arma3Path") as string | null;
    const firstLaunch = store.get("firstLaunch");

    // Tente de récupérer le chemin depuis le registre si non défini
    if (!arma3Path || arma3Path === "null") {
      arma3Path = await getArma3PathFromRegistry();
      if (arma3Path) store.set("arma3Path", arma3Path);
    }

    if (arma3Path && arma3Path !== "null") {
      // Vérifie l'installation du mod
      const modInstalled = isModInstalled(arma3Path);
      sendMessage(
        win,
        modInstalled ? "arma3Path-mod-loaded" : "arma3Path-mod-not-loaded",
        undefined,
        !modInstalled ? `Mod ${config.folderModsName} non installé` : undefined
      );

      // Message de première utilisation
      if (firstLaunch) {
        sendMessage(
          win,
          "firstLaunch-done",
          "Nous vous avons trouvé Arma 3 automatiquement"
        );
        store.set("firstLaunch", false);
      }
    } else {
      store.set("arma3Path", null);
      sendMessage(win, "arma3Path-not-loaded");
    }
    getUpdateMod(win);
  });

  // Gestionnaire de sélection manuelle du dossier Arma 3
  ipcMain.on("locate-arma3", async () => {
    try {
      const result = await dialog.showOpenDialog({
        properties: ["openDirectory"],
        title: "Sélectionner le dossier d'installation d'Arma 3",
        defaultPath:
          "C:\\Program Files (x86)\\Steam\\steamapps\\common\\Arma 3",
      });

      if (!result.canceled && result.filePaths.length > 0) {
        const selectedPath = result.filePaths[0];

        if (await isValidArma3Path(selectedPath)) {
          store.set("arma3Path", selectedPath);
          sendMessage(win, "arma3Path-ready", "Arma 3 trouvé");
        } else {
          sendMessage(
            win,
            "arma3Path-invalid",
            undefined,
            "Le dossier sélectionné ne contient pas Arma 3"
          );
        }
      }
    } catch (error) {
      console.error("Erreur lors de la sélection du dossier Arma 3:", error);
      sendMessage(
        win,
        "arma3Path-error",
        undefined,
        error instanceof Error ? error.message : "Erreur inconnue"
      );
    }
  });

  ipcMain.on("download-mods", async () => {
    const arma3Path = store.get("arma3Path") as string | null;
    if (!arma3Path) {
      sendMessage(win, "download-error", undefined, "Chemin Arma 3 non trouvé");
      return;
    }

    // Envoyer le message de début de téléchargement pour verrouiller l'interface
    sendMessage(win, "download-start");
    console.log("download-start");

    try {
      const modPath = `${arma3Path}\\${config.folderModsName}\\addons`;

      // S'assurer que le dossier existe
      await fs.ensureDir(modPath);

      // Récupérer les listes de mods avec vérification
      const modsListServer =
        (storeModsListServer.get("modsList") as {
          hash: string;
          name: string;
          size: number;
        }[]) || [];

      const modsListClient =
        (storeModsListClient.get("modsList") as {
          hash: string;
          name: string;
          size: number;
        }[]) || [];

      if (!Array.isArray(modsListServer)) {
        throw new Error("La liste des mods serveur est invalide");
      }

      // Calculer la taille totale à télécharger
      let totalSize = 0;
      let downloadedSize = 0;
      const startTime = Date.now();
      let lastProgressUpdate = 0;

      // Supprimer les mods qui ne sont plus dans la liste serveur
      for (const clientMod of modsListClient) {
        if (!clientMod?.name) continue;
        const serverMod = modsListServer.find(
          (m) => m?.name === clientMod.name
        );
        if (!serverMod) {
          const modFilePath = `${modPath}\\${clientMod.name}`;
          if (await fs.pathExists(modFilePath)) {
            await fs.remove(modFilePath);
          }
        }
      }

      // Calculer la taille totale des mods à télécharger
      for (const serverMod of modsListServer) {
        if (!serverMod?.name || !serverMod?.hash) continue;
        const clientMod = modsListClient.find(
          (m) => m?.name === serverMod.name
        );

        if (!clientMod || clientMod.hash !== serverMod.hash) {
          totalSize += serverMod.size;
        }
      }

      // Télécharger ou mettre à jour les mods nécessaires
      for (const serverMod of modsListServer) {
        if (!serverMod?.name || !serverMod?.hash) continue;
        const clientMod = modsListClient.find(
          (m) => m?.name === serverMod.name
        );

        if (!clientMod || clientMod.hash !== serverMod.hash) {
          try {
            const response = await fetch(`${config.urlMods}/${serverMod.name}`);

            if (!response.ok) {
              throw new Error(`Erreur HTTP: ${response.status}`);
            }

            // Récupérer la taille totale du fichier
            const totalFileSize = parseInt(
              response.headers.get("content-length") || "0"
            );
            let downloadedFileSize = 0;

            // Créer un ReadableStream pour suivre la progression
            const reader = response.body?.getReader();
            const chunks = [];

            // eslint-disable-next-line no-constant-condition
            while (true) {
              const { done, value } = (await reader?.read()) || {
                done: true,
                value: undefined,
              };

              if (done) break;

              chunks.push(value);
              downloadedFileSize += value?.length || 0;
              downloadedSize += value?.length || 0;

              // Calculer la progression pour ce fichier spécifique
              const fileProgress = Math.round(
                (downloadedFileSize / totalFileSize) * 100
              );

              // Calculer le temps restant estimé
              const elapsedTime = (Date.now() - startTime) / 1000; // en secondes
              const downloadSpeed = downloadedSize / elapsedTime; // octets par seconde
              const remainingSize = totalSize - downloadedSize;
              const estimatedTimeRemaining = Math.round(
                remainingSize / downloadSpeed
              ); // en secondes

              // Formater le temps restant
              const minutes = Math.floor(estimatedTimeRemaining / 60);
              const seconds = Math.round(estimatedTimeRemaining % 60);
              const timeRemaining = `${minutes}m ${seconds}s`;

              // Envoyer la progression globale et la progression du fichier actuel
              const globalProgress = Math.round(
                (downloadedSize / totalSize) * 100
              );

              // Limiter la fréquence des messages de progression
              if (Date.now() - lastProgressUpdate > 1000) {
                // Mettre à jour toutes les secondes
                sendMessage(
                  win,
                  "download-progress",
                  globalProgress.toString(),
                  undefined,
                  serverMod.name,
                  fileProgress.toString(),
                  timeRemaining
                );
                lastProgressUpdate = Date.now();
              }
            }

            // Concaténer tous les chunks et écrire le fichier
            const buffer = Buffer.concat(chunks);
            await fs.writeFile(`${modPath}\\${serverMod.name}`, buffer);
          } catch (downloadError) {
            console.error(
              `Erreur lors du téléchargement de ${serverMod.name}:`,
              downloadError
            );
            continue;
          }
        }
      }

      // Mettre à jour la liste client
      storeModsListClient.set("modsList", modsListServer);
      sendMessage(win, "download-complete", "Mods mis à jour avec succès");
      sendMessage(win, "arma3Path-mod-loaded", "Jeu prêt à être lancé");
    } catch (error) {
      console.error("Erreur lors du téléchargement des mods:", error);
      // En cas d'erreur, on envoie aussi download-error pour déverrouiller l'interface
      sendMessage(
        win,
        "download-error",
        undefined,
        error instanceof Error ? error.message : "Erreur inconnue"
      );
    }
  });
}

// Gestionnaires d'update
async function getUpdateMod(win: BrowserWindow) {
  const arma3Path = store.get("arma3Path") as string | null;
  if (!arma3Path) return false;
  const modPath = `${arma3Path}\\${config.folderModsName}`;
  try {
    if (!(await fs.existsSync(modPath))) {
      await fs.mkdir(modPath);
    }
    //Télécharger la derniere liste des mods server
    const modsListServer = await fetch(`${config.urlMods}/modsList.json`);
    const modsListServerData = await modsListServer.json();
    storeModsListServer.clear();
    storeModsListServer.set("modsList", modsListServerData);

    //Récupérer la liste des mods client
    const modsListClient =
      (storeModsListClient.get("modsList") as {
        hash: string;
        name: string;
      }[]) || [];
    // Vérifier si les mods client et server sont identiques et identifier ceux à télécharger
    const modsToDownload = [];
    const modsToDelete = [];

    // Trouver les mods à télécharger (nouveaux ou modifiés)
    for (const serverMod of modsListServerData) {
      const clientMod = modsListClient.find((m) => m.name === serverMod.name);
      if (!clientMod || clientMod.hash !== serverMod.hash) {
        modsToDownload.push(serverMod);
      }
    }
    // Trouver les mods à supprimer (plus sur le serveur)
    for (const clientMod of modsListClient) {
      const serverMod = modsListServerData.find(
        (m: { name: string }) => m.name === clientMod.name
      );
      if (!serverMod) {
        modsToDelete.push(clientMod);
      }
    }

    for (const modToDelete of modsToDelete) {
      const modFilePath = path.join(modPath, modToDelete.name);
      if (fs.existsSync(modFilePath)) {
        fs.unlinkSync(modFilePath);
      }
      // Enlever le mod de modsListClient
      const modIndex = modsListClient.findIndex(
        (m) => m.name === modToDelete.name
      );
      if (modIndex > -1) {
        modsListClient.splice(modIndex, 1);
      }
    }

    // Reset le fichier modsListClient
    storeModsListClient.set("modsList", modsListClient);

    //Envoyez une notification pour dire que mise a jours nécéssaire, et le nombre de mods à mettre a jour
    if (modsToDownload.length > 0) {
      sendMessage(
        win,
        "updateMod-needed",
        `Mise à jour nécessaire, ${modsToDownload.length} mods à mettre à jour`
      );
    }

    return true;
  } catch (error) {
    console.error("Erreur lors de la création du dossier mod:", error);
    return false;
  }
}
