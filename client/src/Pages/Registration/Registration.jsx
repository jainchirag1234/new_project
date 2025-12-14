import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";

export default function Registration() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    birthdate: "",
    course: "",
    hobbies: [], // Changed to array
    address: "",
    profileImage: "default.jpg", // Temporary for now
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      let updatedHobbies = [...form.hobbies];
      if (checked) {
        updatedHobbies.push(value);
      } else {
        updatedHobbies = updatedHobbies.filter((hobby) => hobby !== value);
      }
      setForm({ ...form, hobbies: updatedHobbies });
    } else if (type === "file") {
      setForm({ ...form, profileImage: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("gender", form.gender);
    formData.append("birthdate", form.birthdate);
    formData.append("course", form.course);
    formData.append("hobbies", JSON.stringify(form.hobbies));
    formData.append("address", form.address);
    if (form.profileImage && form.profileImage !== "default.jpg") {
      formData.append("profileImage", form.profileImage);
    }

    try {
      const response = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Response:", data);

      if (data.success) {
        alert("User registered successfully!");
        setForm({
          name: "",
          email: "",
          password: "",
          gender: "",
          birthdate: "",
          course: "",
          hobbies: [],
          address: "",
          profileImage: null,
        });
        document.querySelector('input[name="profileImage"]').value = ""; // reset file input
      } else {
        alert(`Registration failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="container mt-5">
      <button
        className="btn btn-primary btn-sm me-2"
        onClick={() => navigate("/")}
      >
        Dashboard
      </button>
      <h2 className="text-center mb-4">Registration Form</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label> Full Name : </label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={form.name}
          placeholder="Enter your name"
          onChange={handleChange}
        />
        <br />
        <br />
        <label> Email Address : </label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={form.email}
          placeholder="Enter your email address"
          onChange={handleChange}
        />
        <br />
        <br />
        <label> Password : </label>
        <input
          type="password"
          name="password"
          className="form-control"
          value={form.password}
          placeholder="Enter strong password"
          onChange={handleChange}
        />
        <br />
        <br />
        <label className="form-check-label me-3"> Gender : </label>
        <input
          type="radio"
          name="gender"
          className="form-check-input me-1"
          value="Male"
          checked={form.gender === "Male"}
          onChange={handleChange}
        />
        Male
        <input
          type="radio"
          name="gender"
          className="form-check-input me-1"
          value="Female"
          checked={form.gender === "Female"}
          onChange={handleChange}
        />
        Female
        <br />
        <br />
        <label> Birthdate : </label>
        <input
          type="date"
          name="birthdate"
          className="form-control"
          value={form.birthdate}
          onChange={handleChange}
        />
        <br />
        <br />
        <label> Course : </label>
        <select
          name="course"
          className="form-select"
          value={form.course}
          onChange={handleChange}
        >
          <option value=""> --Select Course-- </option>
          <option value="MCA"> MCA </option>
          <option value="M.Sc AI & ML"> M.Sc AI & ML </option>
          <option value="PGDCA"> PGDCA </option>
        </select>
        <br />
        <br />
        <label> Hobbies : </label>
        <input
          type="checkbox"
          name="hobbies"
          className="form-check-input"
          value="Reading"
          checked={form.hobbies.includes("Reading")}
          onChange={handleChange}
        />{" "}
        Reading
        <input
          type="checkbox"
          name="hobbies"
          className="form-check-input"
          value="Gaming"
          checked={form.hobbies.includes("Gaming")}
          onChange={handleChange}
        />{" "}
        Gaming
        <input
          type="checkbox"
          name="hobbies"
          className="form-check-input"
          value="Coding"
          checked={form.hobbies.includes("Coding")}
          onChange={handleChange}
        />{" "}
        Coding
        <br />
        <br />
        <label> Address : </label>
        <textarea
          name="address"
          value={form.address}
          className="form-control"
          placeholder="Enter Address"
          rows={3}
          onChange={handleChange}
        ></textarea>
        <br />
        <br />
        <label> Profile Image : </label>
        <input
          type="file"
          name="profileImage"
          className="form-control"
          accept="image/*"
          onChange={handleChange}
        />
        <br />
        <br />
        <button type="submit"> Submit </button>
      </form>
    </div>
  );
}
