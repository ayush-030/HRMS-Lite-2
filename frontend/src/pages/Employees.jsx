import { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await API.get("/employees");
      setEmployees(res.data);
    } catch (err) {
      alert("Error fetching employees");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      await API.post("/employees", formData);

      setFormData({
        employee_id: "",
        full_name: "",
        email: "",
        department: "",
      });

      fetchEmployees();
    } catch (err) {
      alert(err.response?.data?.detail || "Error adding employee");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await API.delete(`/employees/${id}`);
      fetchEmployees();
    } catch (err) {
      alert("Error deleting employee");
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Employee Management</h2>
          <p className="text-gray-600">
            Manage employees and track attendance records.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {/* Add Employee Form */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-lg">+</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                Add New Employee
              </h3>
            </div>

            <form onSubmit={handleAddEmployee} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Employee ID</label>
                <input
                  type="text"
                  name="employee_id"
                  placeholder="e.g., EMP001"
                  value={formData.employee_id}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  placeholder="John Doe"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Department</label>
                <input
                  type="text"
                  name="department"
                  placeholder="Engineering"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>

              <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2.5 rounded-lg font-medium transition shadow-md hover:shadow-lg">
                Add Employee
              </button>
            </form>
          </div>

          {/* Employee List */}
          <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-semibold text-gray-800">
                Employees List
              </h3>

              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                Total: <b>{employees.length}</b>
              </span>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
              </div>
            ) : employees.length === 0 ? (
              <div className="text-gray-500 text-sm border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                <div className="text-4xl mb-2">👤</div>
                <p className="font-medium">No employees found</p>
                <p className="text-xs mt-1">Add your first employee from the form.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700">
                      <th className="p-3 text-left font-semibold rounded-tl-lg">Employee ID</th>
                      <th className="p-3 text-left font-semibold">Name</th>
                      <th className="p-3 text-left font-semibold">Email</th>
                      <th className="p-3 text-left font-semibold">Department</th>
                      <th className="p-3 text-left font-semibold rounded-tr-lg">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {employees.map((emp) => (
                      <tr key={emp.id} className="border-b border-gray-100 hover:bg-blue-50 transition">
                        <td className="p-3 font-semibold text-gray-700">{emp.employee_id}</td>
                        <td className="p-3 text-gray-800">{emp.full_name}</td>
                        <td className="p-3 text-gray-600">{emp.email}</td>
                        <td className="p-3">
                          <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
                            {emp.department}
                          </span>
                        </td>

                        <td className="p-3 flex gap-2">
                          <Link to={`/attendance/${emp.employee_id}`}>
                            <button className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-medium transition shadow-sm hover:shadow">
                              Attendance
                            </button>
                          </Link>

                          <button
                            onClick={() => handleDelete(emp.id)}
                            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-medium transition shadow-sm hover:shadow"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}