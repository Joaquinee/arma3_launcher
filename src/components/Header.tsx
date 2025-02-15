/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
declare module "react" {
  interface CSSProperties {
    WebkitAppRegion?: "drag" | "no-drag";
  }
}

import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const currentPage = useLocation();
  const handleCloseApp = () => {
    window.close();
  };

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
          <span className="text-lg font-medium">Arma 3 Launcher</span>
        </div>

        {/* Navigation centrale */}
        <div
          className="flex items-center space-x-6 ml-auto"
          style={{ WebkitAppRegion: "no-drag" }}
        >
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
          {/* Indicateur rouge (vous pouvez le conditionner selon vos besoins) */}
          <div
            onClick={handleCloseApp}
            className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:bg-red-600"
          ></div>
        </div>
      </nav>
    </header>
  );
}
