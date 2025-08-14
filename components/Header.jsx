import logo from '../src/assets/logo.png';
import { Link } from 'react-router-dom';

const Header = ({ isAuthenticated, onLogout }) => {
  return (
    <header className="w-full border-b bg-white relative p-5">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* LEFT */}
        <div className="flex items-center gap-4 sm:gap-6">
          <img src={logo} alt="Konn3ct" className="h-6 sm:h-8" />
          <nav className="hidden md:flex gap-4 text-sm text-gray-600">
            <a href="#">Solutions</a>
            <a href="#">Contact Sales</a>
            <a href="#">Plan & Pricing</a>
          </nav>
        </div>

        {/* CENTER */}
        {isAuthenticated && (
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <h1 className="text-base sm:text-lg md:text-xl font-semibold text-center">
              2025_1 Online Facilitation Briefing for Students
            </h1>
          </div>
        )}

        {/* RIGHT */}
        <div className="flex gap-2 sm:gap-3">
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
