import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Params from "./components/Params";

import { useState } from "react";
export default function App() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateProgress, setUpdateProgress] = useState({
    percent: 0,
    transferred: 0,
    total: 0,
    bytesPerSecond: 0,
  });

  window.ipcRenderer.on("update-available", () => {
    setIsUpdating(true);
  });

  window.ipcRenderer.on("update-progress", (_, data) => {
    setUpdateProgress(data);
  });

  if (isUpdating) {
    return (
      <div className="min-h-screen flex flex-col bg-[#1A1A1A] text-white transition-all duration-500">
        <div className="flex-grow flex flex-col items-center justify-center">
          <span className="text-2xl mb-4 animate-pulse">
            Mise à jour en cours...
          </span>
          <div className="w-64 bg-gray-700 rounded-full h-4">
            <div
              className="bg-blue-500 h-4 rounded-full transition-all duration-300"
              style={{ width: `${updateProgress.percent}%` }}
            ></div>
          </div>
          <span className="mt-2">{Math.round(updateProgress.percent)}%</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#1A1A1A] text-white transition-all duration-500">
        <Header />
        <Routes>
          <Route path="" element={<Main />} />
          <Route path="params" element={<Params />} />
          <Route
            path="*"
            element={
              <div className="flex-grow flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-4 text-red-500">404</h1>
                <p className="text-xl text-gray-600">Page non trouvée</p>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
