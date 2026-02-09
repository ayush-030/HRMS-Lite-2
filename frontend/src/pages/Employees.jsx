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
      alert("Employee Added!");

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
      alert("Employee deleted");
      fetchEmployees();
    } catch (err) {
      alert("Error deleting employee");
    }
  };

  return (
    <div>
      <h2>Employee Management</h2>

      {/* Add Employee Form */}
      <form
        onSubmit={handleAddEmployee}
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
        <h3>Add Employee</h3>

        <input
          type="text"
          name="employee_id"
          placeholder="Employee ID"
          value={formData.employee_id}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          required
        />

        <button
          style={{
            padding: "10px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add Employee
        </button>
      </form>

      {/* Employee List */}
      <h3>Employees List</h3>

      {loading ? (
        <p>Loading...</p>
      ) : employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead style={{ background: "#f3f4f6" }}>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.employee_id}</td>
                <td>{emp.full_name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>

                <td style={{ display: "flex", gap: "10px" }}>
                  <Link to={`/attendance/${emp.employee_id}`}>
                    <button style={{ cursor: "pointer" }}>Attendance</button>
                  </Link>

                  <button
                    style={{
                      background: "red",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleDelete(emp.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}