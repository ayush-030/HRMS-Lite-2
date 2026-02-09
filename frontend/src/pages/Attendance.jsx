import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/api";

export default function Attendance() {
  const { employeeId } = useParams();

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    employee_id: employeeId,
    date: "",
    status: "Present",
  });

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/attendance/${employeeId}`);
      setRecords(res.data);
    } catch (err) {
      alert("Error fetching attendance");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMarkAttendance = async (e) => {
    e.preventDefault();
    try {
      await API.post("/attendance", formData);
      setFormData({ ...formData, date: "" });
      fetchAttendance();
    } catch (err) {
      alert(err.response?.data?.detail || "Error marking attendance");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <Link
            to="/"
            className="text-sm text-blue-600 hover:underline"
          >
            ⬅ Back to Employees
          </Link>

          <h2 className="text-2xl font-bold text-gray-800 mt-2">
            Attendance Management
          </h2>

          <p className="text-gray-600 text-sm mt-1">
            Employee ID: <b>{employeeId}</b>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {/* Mark Attendance */}
          <div className="bg-white p-5 rounded-xl shadow border">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Mark Attendance
            </h3>

            <form onSubmit={handleMarkAttendance} className="space-y-3">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
              </select>

              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition">
                Save Attendance
              </button>
            </form>
          </div>

          {/* Attendance Table */}
          <div className="md:col-span-2 bg-white p-5 rounded-xl shadow border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Attendance Records
              </h3>

              <span className="text-sm text-gray-600">
                Total Records: <b>{records.length}</b>
              </span>
            </div>

            {loading ? (
              <p className="text-gray-500">Loading attendance records...</p>
            ) : records.length === 0 ? (
              <div className="text-gray-500 text-sm border border-dashed rounded-lg p-4 text-center">
                No attendance records found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700">
                      <th className="p-3 text-left">Date</th>
                      <th className="p-3 text-left">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {records.map((rec) => (
                      <tr key={rec.id} className="border-t hover:bg-gray-50">
                        <td className="p-3">{rec.date}</td>

                        <td className="p-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              rec.status === "Present"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {rec.status}
                          </span>
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
