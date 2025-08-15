import logo from '../src/assets/logo.png';
import { Link } from 'react-router-dom';

const Header = ({ isAuthenticated, onLogout }) => {
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

        {/* CENTER (only if authenticated) */}
        {isAuthenticated && (
          <div className="text-center sm:flex-1 sm:px-4">
            <h1 className="text-sm sm:text-lg md:text-xl font-semibold leading-snug break-words">
              2025_1 Online Facilitation Briefing for Students
            </h1>
          </div>
        )}

        {/* RIGHT */}
        <div className="flex flex-wrap justify-center sm:justify-end gap-2">
          {!isAuthenticated && (
            <Link to="/" className="px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-gray-600">
              Join a Meeting
            </Link>
          )}
          {!isAuthenticated && (
            <Link to="/passcode" className="px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-gray-600">
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
