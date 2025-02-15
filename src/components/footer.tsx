import { useState, useEffect, useCallback } from "react";

export default function Footer() {
  // Regrouper les états initiaux
  const initialStates = {
    progress: 0,
    currentFile: "",
    readyButton: localStorage.getItem("readyButton") === "true",
    isUpdating: localStorage.getItem("isUpdating") === "true",
    requiredPath: localStorage.getItem("requiredPath") !== "false",
    updateModNeeded: localStorage.getItem("updateModNeeded") === "true",
    modInstalled: localStorage.getItem("modInstalled") === "true",
  };

  const [progress, setProgress] = useState(initialStates.progress);
  const [currentFile, setCurrentFile] = useState(initialStates.currentFile);
  const [fileProgress, setFileProgress] = useState(0);
  const [readyButton, setReadyButton] = useState(initialStates.readyButton);
  const [isUpdating, setIsUpdating] = useState(initialStates.isUpdating);
  const [requiredPath, setRequiredPath] = useState(initialStates.requiredPath);
  const [modInstalled, setModInstalled] = useState(initialStates.modInstalled);
  const [updateModNeeded, setUpdateModNeeded] = useState(
    initialStates.updateModNeeded
  );
  const [timeRemaining, setTimeRemaining] = useState("");

  const updateLocalStorage = useCallback((states: Record<string, boolean>) => {
    Object.entries(states).forEach(([key, value]) => {
      localStorage.setItem(key, value.toString());
    });
  }, []);

  const handleUpdate = useCallback(() => {
    if (isUpdating) {
      return;
    }
    setIsUpdating(true);
    window.ipcRenderer.send("download-mods");
  }, [updateLocalStorage]);

  useEffect(() => {
    const handleMainProcessMessage = (
      _event: Electron.IpcRendererEvent,
      message: {
        message: string;
        success?: string;
        data?: string;
        error?: string;
        fileProgress?: string;
        timeRemaining?: string;
      }
    ) => {
      switch (message.message) {
        case "updateMod-needed":
          setUpdateModNeeded(true);
          break;
        case "arma3Path-loaded":
          setIsUpdating(false);
          setReadyButton(true);
          setRequiredPath(false);
          updateLocalStorage({
            isUpdating: false,
            readyButton: true,
            requiredPath: false,
          });
          break;
        case "arma3Path-not-loaded":
          setRequiredPath(true);
          setIsUpdating(false);
          setReadyButton(false);
          updateLocalStorage({
            requiredPath: true,
            isUpdating: false,
            readyButton: false,
          });
          break;
        case "arma3Path-ready":
          setRequiredPath(false);
          setIsUpdating(false);
          setReadyButton(true);
          updateLocalStorage({
            requiredPath: false,
            isUpdating: false,
            readyButton: true,
          });
          break;
        case "arma3Path-mod-loaded":
          setModInstalled(true);
          localStorage.setItem("modInstalled", "true");
          break;
        case "arma3Path-mod-not-loaded":
          setModInstalled(false);
          localStorage.setItem("modInstalled", "false");
          break;
        case "download-progress":
          if (message.success) {
            setProgress(parseInt(message.success));
          }
          if (message.data) {
            setCurrentFile(message.data);
          }
          if (message.fileProgress) {
            setFileProgress(parseInt(message.fileProgress));
          }
          if (message.timeRemaining) {
            setTimeRemaining(message.timeRemaining);
          }
          break;
        case "download-complete":
          setIsUpdating(false);
          setProgress(0);
          setCurrentFile("");
          setFileProgress(0);
          setUpdateModNeeded(false);
          updateLocalStorage({
            isUpdating: false,
            updateModNeeded: false,
          });
          break;
      }
    };
    window.ipcRenderer.on("main-process-message", handleMainProcessMessage);
    return () => {
      window.ipcRenderer.off("main-process-message", handleMainProcessMessage);
    };
  }, [updateLocalStorage]);

  const handleSelectPath = () => {
    window.ipcRenderer.send("locate-arma3");
  };
  return (
    <div className="top-0 left-0 right-0 bg-[#1A1A1A] h-20 flex justify-between items-center px-5">
      {/* Zone centrale avec barre de progression */}
      <div className="flex-1 mx-4">
        {isUpdating && (
          <div>
            {currentFile && (
              <>
                <div className="text-sm text-gray-300 mb-1">
                  Téléchargement de : {currentFile} ({fileProgress}%)
                </div>
                {/* Barre de progression du fichier actuel */}
                <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${fileProgress}%` }}
                  ></div>
                </div>
                {/* Barre de progression globale */}
                <div className="text-sm text-gray-300 mb-1">
                  Progression totale : {progress}%{" "}
                  {timeRemaining && `(Temps restant : ${timeRemaining})`}
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-4">
        {requiredPath && (
          <button
            onClick={handleSelectPath}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded"
          >
            Localiser Jeu
          </button>
        )}

        {!requiredPath && (updateModNeeded || !modInstalled) && (
          <button
            onClick={handleUpdate}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
          >
            {isUpdating ? "Mise à jour..." : "Mettre à jour"}
          </button>
        )}

        {!requiredPath && modInstalled && readyButton && !updateModNeeded && (
          <button
            onClick={() => {
              // Ajouter ici la logique pour lancer le jeu
            }}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
          >
            Jouer
          </button>
        )}
      </div>
    </div>
  );
}
