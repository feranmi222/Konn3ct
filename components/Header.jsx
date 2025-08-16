import { useEffect, useState } from "react";
import logo from "../src/assets/logo.png";
import { Link } from "react-router-dom";

const Header = ({ isAuthenticated, onLogout }) => {
  const [videoTitle, setVideoTitle] = useState("Loading...");

  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const response = await fetch(
          "https://meet.konn3ct.ng/presentation/6d333d16dbadc4a10293c08bbd7d6e6d19be81ff-1713508687932/metadata.xml"
        );
        const text = await response.text();

        // Parse XML
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "text/xml");

        // Look for <meetingName> (common in BigBlueButton metadata.xml)
        const titleNode = xmlDoc.getElementsByTagName("meetingName")[0];

        if (titleNode) {
          setVideoTitle(titleNode.textContent);
        } else {
          setVideoTitle("Untitled Video");
        }
      } catch (err) {
        console.error("Error fetching metadata:", err);
        setVideoTitle("Failed to load title");
      }
    };

    fetchTitle();
  }, []);

  return (
    <header className="w-full border-b bg-white relative p-3 sm:p-5">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* LEFT */}
        <div className="flex items-center justify-between w-full sm:w-auto gap-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Konn3ct" className="h-6 sm:h-8" />
            <nav className="hidden md:flex gap-4 text-sm text-gray-600">
              <a href="#">Solutions</a>
              <a href="#">Contact Sales</a>
              <a href="#">Plan & Pricing</a>
            </nav>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3">
          {isAuthenticated && (
            <h1 className="text-sm sm:text-lg md:text-xl font-semibold leading-snug break-words">
              {videoTitle}
            </h1>
          )}

          {!isAuthenticated && (
            <Link
              to="/"
              className="px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-gray-600"
            >
              Join a Meeting
            </Link>
          )}
          {!isAuthenticated && (
            <Link
              to="/passcode"
              className="px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-gray-600"
            >
              Sign in
            </Link>
          )}
          {!isAuthenticated && (
            <button className="px-3 sm:px-4 py-1 sm:py-2 bg-blue-600 text-white rounded-md text-xs sm:text-sm">
              <Link to="/">Sign Up Here</Link>
            </button>
          )}
          {isAuthenticated && (
            <button
              onClick={onLogout}
              className="px-3 sm:px-4 py-1 sm:py-2 bg-red-500 text-white rounded-md text-xs sm:text-sm"
            >
              Log out
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
