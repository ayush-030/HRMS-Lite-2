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
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition mb-3"
          >
            <span>←</span>
            <span>Back to Employees</span>
          </Link>

          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Attendance Management
          </h2>

          <div className="flex items-center gap-2">
            <span className="text-gray-600">Employee ID:</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold">
              {employeeId}
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {/* Mark Attendance */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-lg">✓</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                Mark Attendance
              </h3>
            </div>

            <form onSubmit={handleMarkAttendance} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </div>

              <button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-2.5 rounded-lg font-medium transition shadow-md hover:shadow-lg">
                Save Attendance
              </button>
            </form>
          </div>

          {/* Attendance Table */}
          <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-semibold text-gray-800">
                Attendance Records
              </h3>

              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                Total Records: <b>{records.length}</b>
              </span>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600"></div>
              </div>
            ) : records.length === 0 ? (
              <div className="text-gray-500 text-sm border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                <div className="text-4xl mb-2">📋</div>
                <p className="font-medium">No attendance records found</p>
                <p className="text-xs mt-1">Mark attendance to get started.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700">
                      <th className="p-3 text-left font-semibold rounded-tl-lg">Date</th>
                      <th className="p-3 text-left font-semibold rounded-tr-lg">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {records.map((rec) => (
                      <tr key={rec.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                        <td className="p-3 text-gray-700 font-medium">{rec.date}</td>

                        <td className="p-3">
                          <span
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 ${
                              rec.status === "Present"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              rec.status === "Present" ? "bg-green-500" : "bg-red-500"
                            }`}></span>
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