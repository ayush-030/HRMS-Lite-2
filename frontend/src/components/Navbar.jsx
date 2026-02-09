import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">HR</span>
          </div>
          <h1 className="text-xl font-bold tracking-wide">HRMS Lite</h1>
        </div>
        
        <div className="flex gap-6 text-sm">
          <Link
            to="/"
            className="hover:text-blue-400 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-gray-800"
          >
            Employees
          </Link>
        </div>
      </div>
    </nav>
  );
}