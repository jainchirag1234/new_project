import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "", // keep empty for security
    gender: "",
    course: "",
    hobbies: [],
    address: "",
    profileImage: null,
  });

  const [existingProfileImage, setExistingProfileImage] = useState("");

  // Fetch user details by ID
  useEffect(() => {
    fetch(`http://localhost:3000/user/${id}`)
      .then((res) => res.json())
      .then((data) => { 
        if (data.success && data.user) {
          setForm({
            name: data.user.name || "",
            email: data.user.email || "",
            password: "",
            gender: data.user.gender || "",
            birthdate: data.user.birthdate
              ? new Date(data.user.birthdate).toISOString().split("T")[0]
              : "",
            course: data.user.course || "",
            hobbies: Array.isArray(data.user.hobbies)
              ? data.user.hobbies
              : data.user.hobbies
              ? data.user.hobbies.split(",")
              : [],
            address: data.user.address || "",
            profileImage: null,
          });
          setExistingProfileImage(data.user.profileImage || "");
        }
      })
      .catch((err) => console.error("Error fetching user:", err));
  }, [id]);

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
    if (form.password) {
      formData.append("password", form.password);
    }
    formData.append("gender", form.gender);
    formData.append("birthdate", form.birthdate);
    formData.append("course", form.course);
    formData.append("hobbies", form.hobbies.join(","));
    formData.append("address", form.address);

    if (form.profileImage) {
      formData.append("profileImage", form.profileImage);
    }

    try {
      const response = await fetch(`http://localhost:3000/user/update/${id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();
      console.log("Update Response:", data);

      if (data.success) {
        alert("User updated successfully!");
        navigate("/"); // Redirect to dashboard after update
      } else {
        alert(`Update failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Update User</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>Full Name:</label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={form.name}
          onChange={handleChange}
        />
        <br />
        <br />
        <label>Email Address:</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={form.email}
          onChange={handleChange}
        />
        <br />
        <br />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          className="form-control"
          value={form.password}
          onChange={handleChange}
        />
        <br />
        <br />
        <label className="form-check-label me-3">Gender:</label>
        <input
          type="radio"
          name="gender"
          value="Male"
          checked={form.gender === "Male"}
          onChange={handleChange}
        />{" "}
        Male
        <input
          type="radio"
          name="gender"
          value="Female"
          checked={form.gender === "Female"}
          onChange={handleChange}
        />{" "}
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
        <label>Course:</label>
        <select
          name="course"
          className="form-select"
          value={form.course}
          onChange={handleChange}
        >
          <option value="">--Select Course--</option>
          <option value="MCA">MCA</option>
          <option value="M.Sc AI & ML">M.Sc AI & ML</option>
          <option value="PGDCA">PGDCA</option>
        </select>
        <br />
        <br />
        <label>Hobbies:</label>
        <input
          type="checkbox"
          name="hobbies"
          value="Reading"
          checked={form.hobbies.includes("Reading")}
          onChange={handleChange}
        />{" "}
        Reading
        <input
          type="checkbox"
          name="hobbies"
          value="Gaming"
          checked={form.hobbies.includes("Gaming")}
          onChange={handleChange}
        />{" "}
        Gaming
        <input
          type="checkbox"
          name="hobbies"
          value="Coding"
          checked={form.hobbies.includes("Coding")}
          onChange={handleChange}
        />{" "}
        Coding
        <br />
        <br />
        <label>Address:</label>
        <textarea
          name="address"
          className="form-control"
          rows="3"
          value={form.address}
          onChange={handleChange}
        ></textarea>
        <br />
        <br />
        <label>Profile Image:</label>
        <input
          type="file"
          name="profileImage"
          className="form-control"
          accept="image/*"
          onChange={handleChange}
        />
        <br />
        <br />
        {form.profileImage ? (
          <img
            src={URL.createObjectURL(form.profileImage)}
            alt="new preview"
            width="100"
          />
        ) : existingProfileImage ? (
          <img
            src={`http://localhost:3000/uploads/${existingProfileImage}`}
            alt="current profile"
            width="100"
          />
        ) : null}
        <br />
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
