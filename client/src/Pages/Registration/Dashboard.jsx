import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

 const fetchUsers = async (query = "") => {
  try {
    let url = "http://localhost:3000/user/";
    if (query) {
      url += `search?name=${encodeURIComponent(query)}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    if (data.success) {
      setUsers(data.users);
    } else {
      alert("Failed to fetch users");
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    alert("Something went wrong!");
  }
};


  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch(`http://localhost:3000/user/delete/${id}`, {
        method: "DELETE"
      });
      const data = await response.json();

      if (data.success) {
        alert("User deleted successfully!");
        fetchUsers(); // Refresh the table
      } else {
        alert(`Delete failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Something went wrong while deleting!");
    }
  };

  return (
    <div className="container mt-5">
      <button className="btn btn-primary btn-sm me-2" onClick={() => navigate("/reg")}>
                    Regestration
                  </button>
      <h2 className="text-center mb-4">User Dashboard</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            fetchUsers(e.target.value);
          }}
        />
      </div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>BirthDate</th>
            <th>Course</th>
            <th>Hobbies</th>
            <th>Address</th>
            <th>Profile Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{new Date(user.birthdate).toLocaleDateString()}</td>
                <td>{user.course}</td>
                <td>{user.hobbies.join(", ")}</td>
                <td>{user.address}</td>
                <td>
                  <img
                    src={`http://localhost:3000/uploads/${user.profileImage}`}
                    alt="Profile"
                    width="80"
                    height="80"
                  />
                </td>
                <td>
                  <button className="btn btn-primary btn-sm me-2" onClick={() => navigate(`/update/${user._id}`)}>
                    Update
                  </button>
                  <button className="btn btn-danger btn-sm"  onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
