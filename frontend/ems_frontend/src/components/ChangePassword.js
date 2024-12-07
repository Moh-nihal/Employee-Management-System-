import React, { useState } from "react";
import axios from "axios";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    username: "",
    old_password: "",
    new_password: "",
  });

  const [message, setMessage] = useState("");


  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await axios.post(
        "http://127.0.0.1:8000/api/change-password/",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Handle success response
      if (response.status === 200) {
        setMessage("Password changed successfully!");
      } else {
        throw new Error("Password change failed.");
      }
    } catch (error) {
           setMessage(
        "Error: " +
          (error.response?.data?.detail ||
            "Invalid username or old password. Please try again.")
      );
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Username</label>
            <input
              style={styles.input}
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Old Password</label>
            <input
              style={styles.input}
              type="password"
              name="old_password"
              value={formData.old_password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>New Password</label>
            <input
              style={styles.input}
              type="password"
              name="new_password"
              value={formData.new_password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" style={styles.button}>Change Password</button>
        </form>
        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  card: {
    width: "400px",
    padding: "20px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
  },
  formGroup: {
    marginBottom: "15px",
    textAlign: "left",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontSize: "14px",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
  },
  message: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#d9534f",
  },
};

export default ChangePassword;
