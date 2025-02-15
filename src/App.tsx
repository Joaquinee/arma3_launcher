import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Params from "./components/Params";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Header />
        <Routes>
          <Route path="" element={<Main />} />
          <Route path="params" element={<Params />} />
          <Route
            path="*"
            element={
              <div className="flex-grow flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <p className="text-xl text-gray-600">Page non trouvée</p>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
