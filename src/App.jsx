import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";
import PasscodePage from "../pages/PasscodePage";
import VideoPage from "../pages/VideoPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = (passcode) => {
    if (passcode === "1234") {
      setIsAuthenticated(true);
      navigate("/video");
    } else {
      alert("Incorrect passcode");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/passcode");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />
      <main className="flex-1 flex items-center justify-center w-full">
        <Routes>
          <Route
            path="/passcode"
            element={
              isAuthenticated
                ? <Navigate to="/video" replace />
                : <PasscodePage onSignIn={handleSignIn} />
            }
          />
          <Route
            path="/"
            element={
              isAuthenticated
                ? <Navigate to="/video" replace />
                : <PasscodePage onSignIn={handleSignIn} />
            }
          />
          <Route
            path="/video"
            element={
              isAuthenticated ? <VideoPage /> : <Navigate to="/passcode" replace />
            }
          />
        </Routes>
      </main>
      <footer className="text-center py-4 text-gray-500 text-sm">
        © 2025 Newwaves ecosystem. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
