import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";
import PasscodePage from "../pages/PasscodePage";
import VideoPage from "../pages/VideoPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [recordId, setRecordId] = useState(
    "6d333d16dbadc4a10293c08bbd7d6e6d19be81ff-1713508687932" // ✅ default
  );
  const navigate = useNavigate();

  const handleSignIn = (passcode, record) => {
    if (passcode === "1234") {
      setRecordId(record);
      setIsAuthenticated(true);
      // navigate(`/video/${record}`);
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
        recordId={recordId} // ✅ still used by Header
      />

      <main className="flex-1 flex items-center justify-center w-full">
        <Routes>
          {/* <Route
            path="/passcode"
            element={
              isAuthenticated ? (
                <Navigate to={`/video/${recordId}`} replace />
              ) : (
                <PasscodePage
                  onSignIn={handleSignIn}
                  recordId={recordId} // ✅ pass recordId
                />
              )
            }
          /> */}

          <Route
            path="/playback/:recordId"
            element={
              isAuthenticated ? (
                <VideoPage recordId={recordId} />
              ) : (
                <PasscodePage
                  onSignIn={handleSignIn}
                />
              )
            }
          />

          <Route
            path="/video"
            element={
              isAuthenticated ? (
                <VideoPage recordId={recordId} />
              ) : (
                <Navigate to="/passcode" replace />
              )
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
