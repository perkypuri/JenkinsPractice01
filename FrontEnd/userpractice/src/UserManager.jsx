import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import config from "./config.js";

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    gender: "",
    contact: ""
  });
  const [message, setMessage] = useState("");

  const baseUrl = `${config.url}/user`;

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const res = await axios.get(`${baseUrl}/viewall`);
      setUsers(res.data);
    } catch (error) {
      setMessage("Failed to fetch users.");
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const addUser = async () => {
    try {
      await axios.post(`${baseUrl}/adduser`, user);
      setMessage("User added successfully.");
      fetchAllUsers();
      resetForm();
    } catch (error) {
      setMessage("Error adding user.");
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage(res.data);
      fetchAllUsers();
    } catch (error) {
      setMessage("Error deleting user.");
    }
  };

  const resetForm = () => {
    setUser({
      id: "",
      name: "",
      email: "",
      password: "",
      gender: "",
      contact: ""
    });
  };

  return (
    <div className="student-container">
      {message && (
        <div
          className={`message-banner ${
            message.toLowerCase().includes("error") ? "error" : "success"
          }`}
        >
          {message}
        </div>
      )}

      <h2>User Management</h2>

      <div className="form-grid">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={user.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
        />
        <select name="gender" value={user.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="MALE">MALE</option>
          <option value="FEMALE">FEMALE</option>
        </select>
        <input
          type="text"
          name="contact"
          placeholder="Contact"
          value={user.contact}
          onChange={handleChange}
        />
      </div>

      <div className="btn-group">
        <button className="btn-blue" onClick={addUser}>
          Add User
        </button>
        <button className="btn-gray" onClick={resetForm}>
          Reset
        </button>
      </div>

      <h3>All Users</h3>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Gender</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((usr) => (
                <tr key={usr.id}>
                  <td>{usr.id}</td>
                  <td>{usr.name}</td>
                  <td>{usr.email}</td>
                  <td>{usr.password}</td>
                  <td>{usr.gender}</td>
                  <td>{usr.contact}</td>
                  <td>
                    <button
                      className="btn-red"
                      onClick={() => deleteUser(usr.id)}
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
  );
};

export default UserManager;
