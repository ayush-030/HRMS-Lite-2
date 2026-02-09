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
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Employee Management</h2>
          <p className="text-gray-600 text-sm mt-1">
            Manage employees and track attendance records.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {/* Add Employee Form */}
          <div className="bg-white p-5 rounded-xl shadow border">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Add New Employee
            </h3>

            <form onSubmit={handleAddEmployee} className="space-y-3">
              <input
                type="text"
                name="employee_id"
                placeholder="Employee ID"
                value={formData.employee_id}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <input
                type="text"
                name="full_name"
                placeholder="Full Name"
                value={formData.full_name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <input
                type="text"
                name="department"
                placeholder="Department"
                value={formData.department}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition">
                Add Employee
              </button>
            </form>
          </div>

          {/* Employee List */}
          <div className="md:col-span-2 bg-white p-5 rounded-xl shadow border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Employees List
              </h3>

              <span className="text-sm text-gray-600">
                Total: <b>{employees.length}</b>
              </span>
            </div>

            {loading ? (
              <p className="text-gray-500">Loading employees...</p>
            ) : employees.length === 0 ? (
              <div className="text-gray-500 text-sm border border-dashed rounded-lg p-4 text-center">
                No employees found. Add your first employee from the form.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700">
                      <th className="p-3 text-left">Employee ID</th>
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-left">Email</th>
                      <th className="p-3 text-left">Department</th>
                      <th className="p-3 text-left">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {employees.map((emp) => (
                      <tr key={emp.id} className="border-t hover:bg-gray-50">
                        <td className="p-3 font-medium">{emp.employee_id}</td>
                        <td className="p-3">{emp.full_name}</td>
                        <td className="p-3">{emp.email}</td>
                        <td className="p-3">{emp.department}</td>

                        <td className="p-3 flex gap-2">
                          <Link to={`/attendance/${emp.employee_id}`}>
                            <button className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs transition">
                              Attendance
                            </button>
                          </Link>

                          <button
                            onClick={() => handleDelete(emp.id)}
                            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs transition"
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
