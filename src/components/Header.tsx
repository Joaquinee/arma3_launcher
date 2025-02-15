/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
declare module "react" {
  interface CSSProperties {
    WebkitAppRegion?: "drag" | "no-drag";
  }
}

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { config } from "../config/config";
export default function Header() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [locked, setLocked] = useState(false);
  const currentPage = useLocation();

  const handleCloseApp = () => {
    window.close();
  };

  window.ipcRenderer.on("main-process-message", (_, data) => {
    if (data.message === "download-start") {
      setLocked(true);
    }
    if (data.message === "download-complete") {
      setLocked(false);
    }
    if (data.message === "download-error") {
      setLocked(false);
    }
  });

  window.ipcRenderer.on("download-complete", () => {
    setLocked(false);
  });

  window.ipcRenderer.on("download-error", () => {
    setLocked(false);
  });

  window.ipcRenderer.on("update-available", () => {
    setIsUpdating(true);
  });

  if (isUpdating) {
    return (
      <div className="bg-[#1A1A1A] text-white">
        <div className="flex flex-col items-center justify-between px-4 py-2">
          <span className="text-lg font-medium">{config.serverName}</span>
          <span className="mt-4">Mise à jour en cours...</span>
        </div>
      </div>
    );
  }
  const handleMouseDown = (_e: React.MouseEvent) => {
    if (window.electron) {
      window.electron.startDrag();
    }
  };

  return (
    <header
      className="bg-[#1A1A1A] text-white"
      onMouseDown={handleMouseDown}
      style={{ WebkitAppRegion: "drag" }}
    >
      <nav className="flex items-center justify-between px-4 py-2">
        <div
          className="flex items-center space-x-2"
          style={{ WebkitAppRegion: "drag" }}
        >
          <span className="text-lg font-medium">{config.serverName}</span>
        </div>

        {/* Navigation centrale */}

        <div
          className="flex items-center space-x-6 ml-auto"
          style={{ WebkitAppRegion: "no-drag" }}
        >
          {!locked ? (
            <>
              <Link
                to="/"
                className={`px-4 py-1 rounded ${
                  currentPage.pathname === "/"
                    ? "bg-[#333333]"
                    : "hover:bg-[#333333]"
                } text-white`}
              >
                Home
              </Link>
              <Link
                to="/params"
                className={`px-4 py-1 rounded ${
                  currentPage.pathname === "/params"
                    ? "bg-[#333333]"
                    : "hover:bg-[#333333]"
                } text-white`}
              >
                Settings
              </Link>
            </>
          ) : (
            <span
              className={`px-4 py-1 rounded ${
                currentPage.pathname === "/params"
                  ? "bg-[#333333]"
                  : "hover:bg-[#333333]"
              } text-white`}
            >
              Mise à jour en cours
            </span>
          )}
          <div
            onClick={handleCloseApp}
            className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:bg-red-600"
          ></div>
        </div>
      </nav>
    </header>
  );
}
