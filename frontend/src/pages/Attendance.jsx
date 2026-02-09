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
      alert("Attendance marked/updated!");
      setFormData({ ...formData, date: "" });
      fetchAttendance();
    } catch (err) {
      alert(err.response?.data?.detail || "Error marking attendance");
    }
  };

  return (
    <div>
      <Link to="/">⬅ Back</Link>

      <h2>Attendance for Employee: {employeeId}</h2>

      {/* Mark Attendance Form */}
      <form
        onSubmit={handleMarkAttendance}
        style={{
          display: "grid",
          gap: "10px",
          maxWidth: "400px",
          marginBottom: "30px",
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <h3>Mark Attendance</h3>

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>

        <button
          style={{
            padding: "10px",
            background: "#16a34a",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Save Attendance
        </button>
      </form>

      {/* Attendance Records */}
      <h3>Attendance Records</h3>

      {loading ? (
        <p>Loading...</p>
      ) : records.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead style={{ background: "#f3f4f6" }}>
            <tr>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {records.map((rec) => (
              <tr key={rec.id}>
                <td>{rec.date}</td>
                <td>{rec.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}