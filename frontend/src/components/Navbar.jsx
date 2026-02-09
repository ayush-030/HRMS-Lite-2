import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-md">
      <h1 className="text-xl font-semibold tracking-wide">HRMS Lite</h1>

      <div className="flex gap-4 text-sm">
        <Link
          to="/"
          className="hover:text-blue-400 transition font-medium"
        >
          Employees
        </Link>
      </div>
    </nav>
  );
}
