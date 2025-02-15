import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <Toaster position="top-left" />
  </React.StrictMode>
);

//ALL MESSAGES ERROR
window.ipcRenderer.on("main-process-message", (_event, message) => {
  const commonToastStyle = {
    style: {
      background: "#333",
      color: "#fff",
    },
    duration: 1500,
  };

  if (!message || !message.message) return;
  const isSuccess = message.success && message.success.length > 0;
  const isError = message.error && message.error.length > 0;

  if (!isSuccess && !isError) return;

  switch (message.message) {
    case "updateMod-needed":
      toast.success(message.success, {
        id: "updateMod-needed-success",
        ...commonToastStyle,
        duration: 5000,
      });
      break;
    case "arma3Path-invalid":
      toast.error(message.error, {
        id: "arma3Path-invalid-error",
        ...commonToastStyle,
      });
      break;
    case "arma3Path-not-found":
      toast.error(message.error, {
        id: "arma3Path-not-found-error",
        ...commonToastStyle,
      });
      break;
    case "arma3Path-ready":
      toast.success(message.success, {
        id: "arma3Path-ready-success",
        ...commonToastStyle,
      });
      break;
    case "firstLaunch-done":
      toast.success(message.success, {
        id: "firstLaunch-done-success",
        ...commonToastStyle,
      });
      break;
    case "arma3Path-mod-loaded":
      toast.success(message.success, {
        id: "arma3Path-mod-loaded-success",
        ...commonToastStyle,
      });
      break;
    case "arma3Path-mod-not-loaded":
      toast.error(message.error, {
        id: "arma3Path-mod-not-loaded-error",
        ...commonToastStyle,
      });
      break;
  }
});
